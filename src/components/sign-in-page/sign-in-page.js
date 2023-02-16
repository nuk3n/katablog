import './sign-in-page.scss';
import * as actions from '../../store/actions';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function SignInPage({ signIn }) {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {
    signIn(email, password).then((res) => {
      if (res.errors) {
        setError('submit', {
          type: 'server',
          message: 'invalid email or password',
        });
      }
    });
    reset();
  };

  return (
    <div className="signInPage">
      <div className="signInPage__title">Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)} className="signInPage__inputForm">
        <label className="signInPage__inputField">
          Email Address
          <br />
          <input
            type="email"
            className="signInPage__input"
            placeholder="Email Address"
            {...register('email', {
              required: true,
              pattern: {
                value: /^([a-z0-9_\-])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Start with lowercase letter and use only valid characters',
              },
            })}
          />
          <div style={{ width: 320, marginTop: -10, color: '#F5222D', display: errors.email ? 'block' : 'none' }}>
            <p>{errors?.email?.message || 'email must be valid email address'}</p>
          </div>
        </label>
        <label className="signInPage__inputField">
          Password
          <br />
          <input
            type="password"
            className="signInPage__input"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
          />
          <div style={{ width: 320, marginTop: -10, color: '#F5222D', display: errors.password ? 'block' : 'none' }}>
            <p>password must be 6-40 characters(included)</p>
          </div>
        </label>
        <input type="submit" className="signInPage__loginButton" value="Login" {...register('submit')} />
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.submit ? 'block' : 'none' }}>
          <p>{errors?.submit?.message || 'fuck'}</p>
        </div>
      </form>
      <div className="signInPage__signUp">
        Don’t have an account?{' '}
        <Link to="/sign-up" className="signInPage__signUpLink">
          Sign Up.
        </Link>
      </div>
    </div>
  );
}

export default connect(null, actions)(SignInPage);
