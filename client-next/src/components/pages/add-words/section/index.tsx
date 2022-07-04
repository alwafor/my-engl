import React, {useState} from 'react'

interface IProps {
  buttonText: string
  children: React.ReactElement
}

const AddWordsSection: React.FC<IProps> = ({buttonText, children}) => {

  const [isOpened, setIsOpened] = useState(false)

  return (
    <section className={isOpened ? 'block hide' : 'block'}>
      <button className="btn_enter" onClick={() => setIsOpened(prev => !prev)}>
        {buttonText}
      </button>
      {children}
    </section>
  )
}

export default AddWordsSection