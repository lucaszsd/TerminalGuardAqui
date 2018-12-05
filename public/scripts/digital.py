## Script da tela de usuário cadastrado
## Link sobre comunicacao python nodejs: https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

# Imports
import hashlib, sys
from pyfingerprint.pyfingerprint import PyFingerprint



#print("FOI")
#sys.stdout.flush()

## Tenta inicializar o sensor
try:
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
	
	## Talvez mandar mensagem de erro pro node aqui
    if ( f.verifyPassword() == False ):
        raise ValueError('A senha do sensor esta errada!')

except Exception as e:
    print('O sensor nao foi inicializado!')
    sys.stdout.flush()
    print('Menssagem de excecao: ' + str(e))
    sys.stdout.flush()
    exit(1)

## Talvez mandar mensagem de aguardando digital pro node
## print('Coloque sua digital')

## Esperar leitura
while ( f.readImage() == False ):
    pass

## Converter a imagem recebida para atributos e armazenar em charbuffer1
f.convertImage(0x01)
## Procurar por template 
result = f.searchTemplate() 
positionNumber = result[0]
#print(result)
##accuracyScore = result[1] ##Talvez usar acurácia como referência de uma digital bem lida

## Digital nao cadastrada
if ( positionNumber == -1 ): 
	
	## Enviar mensagem de nao encontrada pro node
	msg = (-1,-1)
	print(msg)
	sys.stdout.flush()
	
## Digital cadastrada
else: 
    
	## Carregar o template em charbuffer 1
	f.loadTemplate(positionNumber, 0x01) 
	
	## Receber os atributos do template do charbuffer 1
	characterics = str(f.downloadCharacteristics(0x01)).encode('utf-8') 
	
	## Atributos do hash do template
	sha2 = hashlib.sha256(characterics).hexdigest() 
	
	## Enviar chave sha-2 do template para o node
	#print(sha2)
	#sys.stdout.flush()
	print(result)
	sys.stdout.flush()
