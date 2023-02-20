import './sign-up-page.scss';
import { registerUser } from '../../requests/requests';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const passw = watch('password', '');
  const onSubmit = ({ username, email, password }) => {
    registerUser(username, email, password)
      .then((res) => {
        if (res.errors) {
          if (res.errors.username)
            setError('username', {
              type: 'server',
              message: res.errors.username,
            });
          if (res.errors.email)
            setError('email', {
              type: 'server',
              message: res.errors.email,
            });
          if (res.errors.password)
            setError('password', {
              type: 'server',
              message: res.errors.password,
            });
          return;
        }
        toast.success('Successful registration!');
      })
      .catch((e) => toast.error(e.message));
    reset();
  };
  return (
    <div className="signUpPage">
      <div className="signUpPage__title">Create new account</div>
      <form name="username" className="signUpPage__inputForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="signUpPage__inputField">
          Username
          <br />
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /^[a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.username ? 'block' : 'none' }}>
          <p>{errors?.username?.message || 'Username must be 3-20 characters(included)'}</p>
        </div>
        <label className="signUpPage__inputField">
          Email Address
          <br />
          <input
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: true,
              pattern: {
                value: /^([a-z0-9_\-])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Start with lowercase letter and use only valid characters',
              },
            })}
          />
        </label>
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.email ? 'block' : 'none' }}>
          <p>{errors?.email?.message || 'email must be valid email address'}</p>
        </div>
        <label className="signUpPage__inputField">
          Password
          <br />
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
          />
        </label>
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.password ? 'block' : 'none' }}>
          <p>password must be 6-40 characters(included)</p>
        </div>
        <label className="signUpPage__inputField">
          Repeat password
          <br />
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              validate: (value) => value === passw || 'The passwords do not match',
            })}
          />
        </label>
        <div
          style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.repeatPassword ? 'block' : 'none' }}
        >
          <p>password и repeat password should match</p>
        </div>
        <label className="signUpPage__checkbox">
          <input
            type="checkbox"
            name="agreementCheckbox"
            onChange={() => {}}
            {...register('checkbox', {
              required: 'Agreement is required',
            })}
          />
          I agree to the processing of my personal information
        </label>
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.checkbox ? 'block' : 'none' }}>
          <p>should agree</p>
        </div>
        <input type="submit" className="signUpPage__createButton" value="Create" />
      </form>
      <div className="signUpPage__signIn">
        Already have an account?{' '}
        <Link to="/sign-in" className="signInPage__signInLink">
          Sign In.
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
