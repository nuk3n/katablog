import './tags-list.scss';
import Tag from '../tag';
import { useState } from 'react';
import uuid from 'react-uuid';

function TagsList() {
  const [tagList, setTagList] = useState([]);

  const onTagRemove = (id) => {
    const newTagList = tagList.filter((tag) => tag.id !== id);
    setTagList(newTagList);
  };

  const onTagAdd = () => {
    setTagList([...tagList, <Tag key={uuid()} id={uuid()} onTagRemove={onTagRemove} />]);
  };

  return (
    <label className="articlePage__tags">
      <div className="articlePage__tagList">
        Tags
        <br />
        {tagList}
      </div>
      <button type="button" className="articlePage__addTagButton" onClick={onTagAdd}>
        Add tag
      </button>
    </label>
  );
}

export default TagsList;
