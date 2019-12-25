import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'

export const CreatePage = () => {
	const {request} = useHttp()
	const [link, setLink] = useState('')
	const pressHandler = async event => {
		if (event.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'PORT', {from: link})
				console.log(data)
			} catch (e) {

			}
		}
	}

    return (
        <div className="row">
            <div className="col s8 offset-2" style={{paddingTop: '2rem'}}>
		        <div className="input-field">
		          <input 
		            placeholder="Введите E-mail" 
		            id="link" 
		            type="text"
		            value={link}
		            onChange={e => setLink(e.target.value)} 
		            onKeyPrss={pressHandler}/>
		          <label htmlFor="link">Введите ссылку</label>
		        </div>                
            </div>
        </div>
    )
}