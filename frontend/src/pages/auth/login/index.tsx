import Link from 'next/link';
import Field from '../components/Field';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useError } from '@/hooks/useError';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { login, setUser, user } = useAuth();
  const { setLoading, loading } = useLoading();
  const { setError, error } = useError();
  const router = useRouter();

  const onLogin = () => {
    setLoading(true);
    setError('');
    login()
      .then((res) => {
        localStorage.setItem('token', res.token);
        router.push('/chats');
      })
      .catch((err) => {
        if (err.code === 401) {
          setError('Wrong username or password');
        } else {
          setError("We've encountered an error.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
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
            label="Password"
            type="password"
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
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Registration Section */}
        <div className="mt-6">
          <p className="text-gray-600 text-sm">
            {"Don't have an account? "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
