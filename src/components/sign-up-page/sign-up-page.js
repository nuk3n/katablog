import './sign-up-page.scss';
import HookFormAlertDiv from '../hook-form-alert-div';
import routes from '../routes';
import { registerUser } from '../../store/actions';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage({ history }) {
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
        history.push(routes.signIn);
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
        <HookFormAlertDiv errors={errors} field="username" message="Username must be 3-20 characters(included)" />
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
        <HookFormAlertDiv errors={errors} field="email" message="email must be valid email address" />
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
        <HookFormAlertDiv errors={errors} field="password" message="password must be 6-40 characters(included)" />
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
        <HookFormAlertDiv errors={errors} field="repeatPassword" message="password и repeat password should match" />
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
        <HookFormAlertDiv errors={errors} field="checkbox" message="should agree" />
        <input type="submit" className="signUpPage__createButton" value="Create" />
      </form>
      <div className="signUpPage__signIn">
        Already have an account?{' '}
        <Link to={routes.signIn} className="signInPage__signInLink">
          Sign In.
        </Link>
      </div>
    </div>
  );
}

export default withRouter(SignUpPage);
