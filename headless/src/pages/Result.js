import { useEffect, useState } from 'react'

function Result() {
	const [token, setToken] = useState('')

	useEffect(() => {
		const storedToken = localStorage.getItem('nekoTssel-PTO')
		setToken(storedToken)
	}, [])

	return <div >
		<div>Token: {token}</div><br/><br/>
		{/* <div>This token can be validated using OTPless API endpoints from backend. <a target="_blank" href="https://otpless.com/platforms/verify-sdk-token">Click here</a> for more details.</div> */}
		<div>Note: Tokens can only be validated once and cannot be used again. Re-authenticate to get a new token.</div>
	</div>
}

export default Result