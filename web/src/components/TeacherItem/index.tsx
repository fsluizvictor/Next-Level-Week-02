import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars1.githubusercontent.com/u/59936665?s=460&u=09f742d74df24afcd0a46d27dd9f363e8f5a9600&v=4" alt="Luiz Victor" />
            <div>
                <strong>Luiz Victor</strong>
                <span>Estrutura de Dados</span>
            </div>
        </header>
        <p>
            çokinfkfplkfmwçflmqwflmwqflqwmfqwlmfqwlfmwçlfmqwflmqwçflmqwflqmwfqwlmfqwlfmqwçlfm
            <br></br>
            knqwkqwṕlqmwflmqwflwqmflqwmlwqmpoqw[polcldsmvdlkçvmnpój qwpk[jpoeo  wejgkwen    kẃe nm]]
        </p>
        <footer>
            <p>
                Preço/hora
                <strong>R$ 40,00</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="Entrar em contato" />
                Entrar em contato
            </button>
        </footer>
    </article>
    )
}

export default TeacherItem