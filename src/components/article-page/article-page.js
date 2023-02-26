import './article-page.scss';
import routes from '../routes';
import HookFormAlertDiv from '../hook-form-alert-div';
import { useForm, useFieldArray } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ArticlePage({ isLoggedIn, pageStatus, article, submitArticle, slug, history }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: article
      ? {
          title: article.title,
          shortDescription: article.description,
          text: article.body,
          tags: article.tagList.map((t, i) => ({ tag: article.tagList[i] })),
        }
      : null,
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  if (!isLoggedIn) {
    return <Redirect to="/sign-in" />;
  }
  const onSubmit = ({ title, shortDescription, text, tags }) => {
    const tagsArr = tags.map((tag, i) => tags[i].tag);
    submitArticle(title, shortDescription, text, tagsArr, slug)
      .then((res) => {
        if (res.ok) {
          toast.success('Successful submit!');
          history.push(routes.base);
        } else if (res.status === 401) toast.error('Not authorized');
        else toast.error('Something has gone terribly wrong!');
      })
      .catch((e) => toast.error(e.message));
    reset();
  };
  return (
    <div className="articlePage">
      <div className="articlePage__header">{pageStatus === 'edit' ? 'Edit article' : 'Create new article'}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="articlePage__form">
        <label className="articlePage__label">
          <span>Title</span>
          <input
            type="text"
            className="articlePage__input articlePage__title"
            placeholder="Title"
            {...register('title', { required: true })}
          />
          <HookFormAlertDiv errors={errors} field="title" message="You should write something here" />
        </label>
        <label className="articlePage__label">
          <span>Short description</span>
          <input
            type="text"
            className="articlePage__input articlePage__shortDescription"
            placeholder="Short Description"
            {...register('shortDescription', { required: true })}
          />
          <HookFormAlertDiv errors={errors} field="shortDescription" message="You should write something here" />
        </label>
        <label className="articlePage__label">
          <span>Text</span>
          <textarea
            className="articlePage__input articlePage__text"
            placeholder="Text"
            {...register('text', { required: true })}
          />
          <HookFormAlertDiv errors={errors} field="text" message="You should write something here" />
        </label>
        <div className="articlePage__label">
          <span>Tags</span>
          <section className="articlePage__tagsSection">
            <ul className="articlePage__tagList">
              {fields.map((field, index) => (
                <li key={field.id} className="articlePage__tag">
                  <input
                    type="text"
                    placeholder="Tag"
                    className="articlePage__tagInput"
                    {...register(`tags.${index}.tag`)}
                  />
                  <button type="button" className="articlePage__tagDeleteButton" onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="articlePage__addTagButton"
              onClick={() => {
                append({ tag: '' });
              }}
            >
              Add tag
            </button>
          </section>
        </div>
        <button type="submit" className="articlePage__submitButton">
          Send
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(withRouter(ArticlePage));
