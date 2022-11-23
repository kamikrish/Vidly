export default function Like(props){
    return (<i 
    onClick={props.onClick}
    style={{color:props.liked ? "red":"green", cursor:"pointer"}} 
    className="fa fa-resular fa-heart"></i>);
}