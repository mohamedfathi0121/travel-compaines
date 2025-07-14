import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Input from '../../components/shared/Input';
import { Link, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { signIn } = useAuth();
  
  const Navigate = useNavigate();
  const onSubmit = async (data) => {
    const toastId = toast.loading('Signing in...');
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) throw error;
      toast.success('Login successful!', { id: toastId });
      Navigate('/'); // Redirect to home or dashboard after successful login
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error(error.message || 'Invalid email or password.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-center px-4 pt-12 pb-16">
      <div className="w-full max-w-xl bg-background border border-gray-200 rounded-lg shadow-md px-6 py-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-primary block mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className={`w-full bg-input px-4 py-3 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary block mb-2">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className={`w-full bg-input px-4 py-3 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-button-primary text-white font-semibold text-sm hover:bg-btn-primary-hover transition disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Log in'}
            </button>
          </div>

          <div className="text-center space-y-2">
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
