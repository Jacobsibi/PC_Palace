import { useRouter } from "next/router";
import { client } from "../../lib/client";

const Generate = ({ props }) => {
    
}

export const getServerSideProps = async () => {
    const router = useRouter();
    const params = router.query;

    // fetch PC from sanity

    return {
        props: {
            generatedPC: {

            }
        } 
    };
}

export default Generate;
