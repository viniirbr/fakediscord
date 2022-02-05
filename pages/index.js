import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter} from 'next/router'

function Title(props) {
    const Tag = props.tag || 'h1'
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx> {`
                ${Tag} {
                    color:${appConfig.theme.colors.green['600']};
                    font-size: 24px;
                }   
            `}</style>
        </>
    ) 
}

// function HomePage() {
//     //JSX
//     return (
//         <>
//             <GlobalStyle />
//             <Title tag='h1'>Boas vindas de volta!</Title>
//             <h2>Discord - Alura Matrix</h2>
//         </>
        
//     ) 
//   }
  
//   export default HomePage
export default function PaginaInicial() {
    //const username = 'viniirbr';
    const [username, setUsername] = React.useState('')
    const routing = useRouter()
    const teste = 'hidden'
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.green['400'],
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.brown['600'],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit = {function(eventinfo) {
                  eventinfo.preventDefault()
                  routing.push(`/chat?username=${username}`)
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', height: '100%', gap:'10px'
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['300'] }}>
                {appConfig.name}
              </Text>

              {/* <input
                type='text'
                value={username}
                onChange={function (event) {
                    const value = event.target.value
                    console.log('usuario digitou: ' + value)
                    setUsername(value)
                }}
                /> */}
  
              <TextField
              value={username}
              onChange={function (event) {
                  const value = event.target.value
                  setUsername(value)
              }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals['200'],
                    mainColor: appConfig.theme.colors.brown['900'],
                    mainColorHighlight: appConfig.theme.colors.brown['400'],
                    backgroundColor: appConfig.theme.colors.brown['900'],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                width='30%'
                rounded='full'
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.brown['400'],
                  mainColorLight: appConfig.theme.colors.brown['100'],
                  mainColorStrong: appConfig.theme.colors.brown['900'],
                }}
                onClick={(event) => {
                  
                }}

              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            
            
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.brown['900'],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals['999'],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px'
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                  marginTop: {
                    xs:'10px',
                    sm:'0'
                  }
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['200'],
                  backgroundColor: appConfig.theme.colors.neutrals['900'],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }