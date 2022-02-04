
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient} from '@supabase/supabase-js'
import { useRouter} from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzg0NTkwNCwiZXhwIjoxOTU5NDIxOTA0fQ.H5nOxreK09IG63Haw6TJ2UCBwcCIcfeRUnNzyF9tnjI'
const URL = 'https://jlgqjeoxwqgympdhayve.supabase.co'
const supabaseCliente = createClient(URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    const routing = useRouter()
    const currentUser = routing.query.username
    // Sua lógica vai aqui
    const [message, setMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])
    //     {
    //         id: 1,
    //         from: 'viniirbr',
    //         messageText: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_14.png'
    //     },
    //     {
    //         id: 2,
    //         from: 'peas',
    //         messageText: 'Gostei desse sticker!'
    //     }
    // ])

    React.useEffect(() => {
        supabaseCliente
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                 setMessageList(data)
            })
    }, [])

    function handleNewMessage(newMessage) {
        const message = {
            id: messageList.length+1,
            from: currentUser,
            messageText: newMessage
        }
        supabaseCliente
            .from('mensagens')
            .insert([message])
            .then(({ data }) => {
                console.log("Dados inseridos: ", data[0])
                setMessageList([data[0], ...messageList])
            })
        setMessage('')
        // setMessageList([message,...messageList])
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.green[600],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                height: '500px'
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messages={messageList}/>

                    {/* <MessageList mensagens={[]} /> */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            onChange={(event) => {
                                const value = event.target.value
                                setMessage(value)
                            }}
                            onKeyPress={(event) => {
                                if(event.key === 'Enter') {
                                    event.preventDefault()
                                    handleNewMessage(message)
                                }
                            }}    
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick = {(sticker) => {
                                handleNewMessage(':sticker:' + sticker)

                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return(
                    <Text
                key={message.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${message.from}.png`}
                    />
                    <Text tag="strong">
                        {message.from}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {message.messageText.startsWith(':sticker:') 
                    ? (
                        <Image styleSheet={{width:'100px'}} src={message.messageText.replace(':sticker:', '')}/>
                    )
                    : (
                        message.messageText
                    )
                    }

            </Text> 
                )
            })
        }
        </Box>
    )
}