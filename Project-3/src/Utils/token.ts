import jwt_decode from "jwt-decode"

const decryptToken = (token: any) => {
    const decoded = jwt_decode(token);
    return decoded;
}

export default decryptToken;
