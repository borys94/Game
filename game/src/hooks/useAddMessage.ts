import { useDispatch } from 'react-redux'
import { addMessage } from '../store/infoBar'

const useAddMessage = () => {
  const dispatch = useDispatch()
  return (text: string) => dispatch(addMessage(text))
}

export default useAddMessage
