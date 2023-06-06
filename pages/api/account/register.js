import { auth } from "../../../configurations/firebase";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

export default async function register(req, res) {


    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        console.log("bad");
        res.status(400).end();
    }

    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: fullName });

    res.status(200).end();
}
