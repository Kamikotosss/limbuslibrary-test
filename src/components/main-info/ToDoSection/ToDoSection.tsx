import { useRef } from "react"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import "./ToDoSection.css"
export const ToDoSection: React.FC = () => {
    const todos = [
        "Добавление гайдов",
        "Улучшение функционала тим билдера",
        "Общие улучшения интерфейса и содержимого сайта",
    ]
    const AnimatedList:React.FC<{text:string}> = ({text}) => {
        const listRef = useRef(null);
        const {isVisible} = useIntersectionObserver(listRef,0.5);
        return <li ref={listRef} className={`${ isVisible && "todo-section--animated"}`}>
            {text}
        </li>
    }
    return <section className="todo-section">
    <h2> Планы по улучшению сайта </h2>
    <p>Если у вас есть идеи или предложения пожалуйста сконтактируйтесь с нами</p>
    <ul>
     {todos.map((todo,index)=>{
        return <AnimatedList text={todo} key={index}/> 
     })}
    </ul>
</section>
}