import { editProfile } from '../../requests/requests';
import * as actions from '../../store/actions';
import LoadingIndicator from '../loadingIndicator';
import { useForm } from 'react-hook-form';
import './edit-profile-page.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

function EditProfilePage({ isLoggedIn, setUserData, userData, status }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });
  if (status === 'loading') return <LoadingIndicator />;
  if (!isLoggedIn) return <Redirect to="/sign-in" />;

  const onSubmit = ({ username, email, password, avatarUrl }) => {
    editProfile(username, email, password, avatarUrl)
      .then((body) => {
        localStorage.setItem('token', JSON.stringify(body.user.token));
        setUserData(body.user.username, body.user.email, body.user.image);
      })
      .catch((e) => toast.error(e));
    reset();
  };

  return (
    <div className="editProfilePage">
      <div className="editProfilePage__title">Edit Profile</div>
      <form onSubmit={handleSubmit(onSubmit)} className="editProfilePage__inputForm">
        <label className="editProfilePage__inputField">
          Username
          <br />
          <input
            type="text"
            placeholder="Username"
            className="editProfilePage__input"
            defaultValue={userData.username}
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
        <label className="editProfilePage__inputField">
          Email Address
          <br />
          <input
            type="email"
            placeholder="Email Address"
            className="editProfilePage__input"
            defaultValue={userData.email}
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
        <label className="editProfilePage__inputField">
          New password
          <br />
          <input
            type="password"
            placeholder="New password"
            className="editProfilePage__input"
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
        <label className="editProfilePage__inputField">
          Avatar image (url)
          <br />
          <input
            type="url"
            placeholder="Avatar image"
            className="editProfilePage__input"
            defaultValue={userData.image || null}
            {...register('avatarUrl', {
              pattern: {
                value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&/=]*)$/,
                message: 'correct url is required',
              },
            })}
          />
        </label>
        <div style={{ width: 320, marginTop: -25, color: '#F5222D', display: errors.password ? 'block' : 'none' }}>
          <p>you should insert url path here</p>
        </div>
        <input type="submit" className="editProfilePage__saveButton" value="Save" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  status: state.status,
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, actions)(EditProfilePage);
