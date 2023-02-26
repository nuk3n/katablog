import './hook-form-alert-div.scss';
import classNames from 'classnames';

function HookFormAlertDiv({ errors, field, message }) {
  const hookFormAlertDivClasses = classNames({
    hookFormAlertDiv: true,
    'hookFormAlertDiv--show': errors[field],
  });
  return (
    <div className={hookFormAlertDivClasses}>
      <p>{errors?.[field]?.message || message}</p>
    </div>
  );
}

export default HookFormAlertDiv;
