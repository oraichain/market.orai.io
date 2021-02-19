import { Card } from 'antd';
import styles from "./ArtworkFunction.less";

function ArtworkFunction(props) {
  const {
    logo,
    title,
    description
  } = props;
  return (
    <Card hoverable className={styles.AFCard} bodyStyle={{ padding: 15 }}>
      <img src={logo} className={styles.AFLogo} />
      <div className={styles.AFTitle}>{title}</div>
      <div className={styles.AFDescription}>{description}</div>
    </Card>
  );
}

export default ArtworkFunction;