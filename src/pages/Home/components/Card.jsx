import React from 'react';
import { Button } from 'antd';
import styles from './Card.less';
import { Link } from 'umi';

export default function Card({ name, description, tryIt }) {
  return (
    <div className={styles.card}>
      {name == 'oscript_classification' ? (
        <img
          alt="avatar-script"
          className={styles.imageCover}
          src="https://res.cloudinary.com/djy5gktft/image/upload/v1605414782/IMAGES/predictivehackstemplate-1_cxwt4w.jpg"
        />
      ) : name == 'oscript_classification_v2' ? (
        <img
          alt="avatar-script"
          className={styles.imageCover}
          src="https://res.cloudinary.com/djy5gktft/image/upload/v1605414834/IMAGES/image_classification_qpli84.png"
        />
      ) : (
            <img
              alt="avatar-script"
              className={styles.imageCover}
              src="https://res.cloudinary.com/djy5gktft/image/upload/v1605414958/IMAGES/ocr-1_grtzbg.jpg"
            />
          )}

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <Link to="/oscript/marketdetail">
          <Button
            className={styles.button}
            onClick={() => {
              tryIt(name);
            }}
          >
            Try it now
        </Button>
        </Link>
      </div>
    </div>
  );
}
