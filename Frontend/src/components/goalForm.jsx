import { text } from 'express'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function goalForm() {

    cont [text, setText] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }
    const onChange = (e) => {
        setText(e.target.value)
    }
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name='text' id='text' value={text}
                onChange={onChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='Submit'>Add Goal</button>
            </div>
            </form>
        </section>
    )
}

export default goalForm