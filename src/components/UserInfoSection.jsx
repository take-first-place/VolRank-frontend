import { REGIONS } from "../constants/regionData";

const UserInfoSection = ({ user, userError }) => {

    if (userError) {
        return <p className="mypage-error">에러: {userError}</p>;
    }

    if (!user) {
        return <p className="mypage-empty-text">회원 정보를 불러올 수 없습니다.</p>;
    }

    const city = REGIONS.find(
        (r) => r.code === user.region_code?.slice(0, 2)
    );

    const district = city?.districts.find(
        (d) => d.code === user.region_code
    );

    return (
        <>
        <p>이름: {user.username}</p>
        <p>닉네임: {user.nickname}</p>
        <p>이메일: {user.email}</p>
        <p>지역: {city?.name} {district?.name}</p>
        <p>가입일: {new Date(user.created_at).toLocaleDateString()}</p>
        </>
    );
};

export default UserInfoSection;
