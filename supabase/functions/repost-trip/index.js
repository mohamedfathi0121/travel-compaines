import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  console.log("Function invoked. Method:", req.method);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    console.log("Supabase admin client created.");

    // Securely validate the user is logged in
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error("Missing Authorization header")
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseAdmin.auth.getUser(token)
    if (!user) {
      throw new Error("Invalid user session.")
    }
    console.log("User validated successfully:", user.id);

    const tripDetails = await req.json()
    console.log("Received trip details payload:", tripDetails);

    // Validate that a company ID was provided in the request
    if (!tripDetails.companyId) {
        throw new Error("companyId is missing from the request body.");
    }
    console.log("Company ID found:", tripDetails.companyId);
    console.log("data", tripDetails)

    // 1. Insert into base_trips table



    // 2. Insert into trip_schedules table
    console.log("Attempting to insert into trip-schedules...");
    const { error: scheduleError } = await supabaseAdmin
      .from("trip_schedules")
      .insert([{
        base_trip_id: tripDetails.id,
        start_date: tripDetails.startDate,
        end_date: tripDetails.endDate,
        available_tickets: Number(tripDetails.availableTickets),
        location_url:tripDetails.locationURL,
        price: {
          price_single: tripDetails.priceSingle,
          price_double: tripDetails.priceDouble,
          price_triple: tripDetails.priceTriple,
        },
        price_include: tripDetails.priceInclude,
        price_not_include: tripDetails.priceNotInclude,
        status: 'open',
      }])

    if (scheduleError) throw scheduleError;
    console.log("Successfully inserted into trip-schedules.");

    return new Response(JSON.stringify({ message: "Trip added successfully", tripId: trip.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (err) {
    console.error("--- FUNCTION CRASH ---");
    console.error("Error:", err);
    console.error("Error Message:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})