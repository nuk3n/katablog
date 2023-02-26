import './sign-in-page.scss';
import * as actions from '../../store/actions';
import HookFormAlertDiv from '../hook-form-alert-div';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

function SignInPage({ signIn, history }) {
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
    signIn(email, password)
      .then((res) => {
        if (res.errors) {
          setError('submit', {
            type: 'server',
            message: 'invalid email or password',
          });
        } else {
          reset();
          history.push('/');
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
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
          <HookFormAlertDiv errors={errors} field="email" message="email must be valid email address" />
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
          <HookFormAlertDiv errors={errors} field="password" message="password must be 6-40 characters(included)" />
        </label>
        <input type="submit" className="signInPage__loginButton" value="Login" {...register('submit')} />
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

export default connect(null, actions)(withRouter(SignInPage));
