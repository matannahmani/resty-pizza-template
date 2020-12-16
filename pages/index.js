import Productbox from '../components/productbox';
import {apigetProduct} from '../lib/pizzaapicontroller';
export default function Home(props) {


  return (
    <>
    <Productbox data={props}/>
    </>
  )
}
export const getServerSideProps = async () => {
  // Get external data from the file system, API, DB, etc.
  const data = await apigetProduct();
  const unseralized = [];
  await data.data.data.forEach(i => unseralized.push(i.attributes)); // please fix in the future it hurts my eyes jesus fast api what a mess
  return {
    props: {data: unseralized,code: data.code},
    revalidate: 1, // In seconds

  }
}