import {FC} from 'react';
import styles from '../../../styles/FullPageLoader.module.scss';

type Props = {};

const Loader: FC<Props> = ({}) => {
   return (
       <div className={styles.overlay}>
          <h1 className={styles.title}>Loading...</h1>
       </div>
   );
};

export default Loader;
