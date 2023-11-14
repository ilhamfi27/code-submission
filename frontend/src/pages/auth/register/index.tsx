import Link from 'next/link';
import Field from '../components/Field';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useError } from '@/hooks/useError';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { register, setUser, user } = useAuth();
  const { setLoading, loading } = useLoading();
  const { setError, error } = useError();
  const router = useRouter();

  const onRegister = () => {
    setLoading(true);
    setError('');
    register()
      .then(() => {
        router.push('/auth/login');
      })
      .catch((err) => {
        setError("We've encountered an error.");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
        >
          <Field
            label="Email"
            type="email"
            value={user.email}
            placeholder="johndoe@test.net"
            onChange={(val) => {
              setUser({ ...user, email: val });
            }}
          />
          <Field
            label="Username"
            type="text"
            value={user.username}
            placeholder="johndoe"
            onChange={(val) => {
              setUser({ ...user, username: val });
            }}
          />
          <Field
            label="First Name"
            type="text"
            value={user.firstName}
            placeholder="John"
            onChange={(val) => {
              setUser({ ...user, firstName: val });
            }}
          />
          <Field
            label="Last Name"
            type="text"
            value={user.lastName}
            placeholder="Doe"
            onChange={(val) => {
              setUser({ ...user, lastName: val });
            }}
          />
          <Field
            label="Password"
            type="text"
            value={user.password}
            placeholder="*************"
            onChange={(val) => {
              setUser({ ...user, password: val });
            }}
          />
          <Field
            label="Password Confirmation"
            type="text"
            value={user.password}
            placeholder="*************"
            onChange={(val) => {
              setUser({ ...user, password: val });
            }}
          />
          <div className="mb-3 text-red-600 text-sm">{error}</div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Registration Section */}
        <div className="mt-6">
          <p className="text-gray-600 text-sm">
            {'Already Have an Account? '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
