import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  console.log("--- Edge function invoked ---");

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let userId = null;

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log("Admin client created.");

    // 1. Parse the multipart/form-data request
    const formData = await req.formData();
    console.log("FormData received.");

    const email = formData.get('email');
    const password = formData.get('password');
    const companyName = formData.get('companyName');
    const companyAddress = JSON.parse(formData.get('companyAddress'));
    const companyUrl = formData.get('companyUrl');
    const phoneNumbers = JSON.parse(formData.get('phoneNumbers'));
    const socialProfiles = JSON.parse(formData.get('socialProfiles'));
    const logoFile = formData.get('companyLogo');
    const documents = formData.getAll('documents');
    console.log(`Parsed form data for company: ${companyName}`);

    // 2. Create the user
    console.log(`Attempting to create user for: ${email}`);
    const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: companyName }
    });
    if (authError) throw authError;
    if (!user) throw new Error("User creation failed.");
    userId = user.id;
    console.log(`User created with ID: ${userId}`);
    
    // *** FIX: Explicitly create the profile with the required 'role' field ***
    console.log(`Explicitly creating profile for user ID: ${userId}`);
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        display_name: companyName,
        role: 'company_user' // Add the role to satisfy the not-null constraint
      })
      .select('id')
      .single();
    if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`);
    console.log("Profile created successfully.");


    // 3. Upload logo to Supabase Storage
    let logoUrl = null;
    if (logoFile && logoFile instanceof File) {
      console.log(`Uploading logo: ${logoFile.name}`);
      const logoPath = `${userId}/${logoFile.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('company-assets')
        .upload(logoPath, logoFile, { contentType: logoFile.type });
      if (uploadError) throw uploadError;
      const { data } = supabaseAdmin.storage.from('company-assets').getPublicUrl(logoPath);
      logoUrl = data.publicUrl;
      console.log(`Logo uploaded to: ${logoUrl}`);
    }
    
    // 4. Upload verification documents
    const documentUrls = [];
    if (documents && documents.length > 0) {
        console.log(`Uploading ${documents.length} documents...`);
        for (const doc of documents) {
            if (doc instanceof File) {
                const docPath = `${userId}/verification/${doc.name}`;
                const { error: docUploadError } = await supabaseAdmin.storage
                    .from('company-assets')
                    .upload(docPath, doc, { contentType: doc.type });
                if (docUploadError) throw docUploadError;
                const { data } = supabaseAdmin.storage.from('company-assets').getPublicUrl(docPath);
                documentUrls.push(data.publicUrl);
            }
        }
        console.log("All documents uploaded.");
    }

    // 5. Insert the final company record with all URLs
    console.log("Inserting company record into database...");
    const { error: companyError } = await supabaseAdmin
      .from('companies')
      .insert({
        id: profileData.id,
        c_name: companyName,
        contact_email: email,
        address: companyAddress,
        website_url: companyUrl,
        phone_numbers: phoneNumbers,
        social_profiles: socialProfiles,
        logo_url: logoUrl,
        verification_document_url: JSON.stringify(documentUrls)
      });
    if (companyError) throw companyError;
    console.log("Company record inserted successfully.");

    return new Response(JSON.stringify({ message: "Registration successful!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("--- ERROR IN EDGE FUNCTION ---");
    console.error(error);
    // Rollback logic
    if (userId) {
      console.log(`Rolling back: Deleting user ${userId}`);
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
      await supabaseAdmin.auth.admin.deleteUser(userId);
    }
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
