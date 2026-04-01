import{useNavigate} from "react-router-dom";

function Home(){
    const Navigate = useNavigate();


return(
    <div>
        <h1> 메인페이지</h1>
        <button onClick={()=> Navigate("/login")}>
            로그인
        </button>

        <button onClick={()=>Navigate("/signup")}>
            회원가입
        </button>
    </div>
    );

}
export default Home;
