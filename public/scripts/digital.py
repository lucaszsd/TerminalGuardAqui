## Script da tela de usuario cadastrado
## Link sobre comunicacao python nodejs: https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

## Estrutura do retorno: [flag_inicializacao, (positionNumber,accuracyScore)]

## Imports
import hashlib, sys
from pyfingerprint.pyfingerprint import PyFingerprint

## Tenta inicializar o sensor
f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

if ( f.verifyPassword() == False ): ## Se nao conseguiu inicializar, flag de inicializacao = -1
	print(-2)
	sys.stdout.flush()
	print(-2)
	sys.stdout.flush()
	
else:						## Se conseguiu inicializar, flag de inicializacao = 0
	## Esperar leitura
	while ( f.readImage() == False ):
		pass

	## Converter a imagem recebida para atributos e armazenar em charbuffer1
	f.convertImage(0x01)
	## Procurar por template 
	result = f.searchTemplate() 
	positionNumber = result[0]

	## Digital nao cadastrada
	if ( positionNumber == -1 ): 
		
		## Enviar mensagem de nao encontrada pro node
		print(-1)
		sys.stdout.flush()
		print(-1)
		sys.stdout.flush()
		
	## Digital cadastrada
	else: 
		
		## Carregar o template em charbuffer 1
		f.loadTemplate(positionNumber, 0x01) 
		
		## Receber os atributos do template do charbuffer 1
		characterics = str(f.downloadCharacteristics(0x01)).encode('utf-8') 
		
		## Atributos do hash do template
		sha2 = hashlib.sha256(characterics).hexdigest() 
		
		## Enviar resultado pro node
		print(result[0])
		sys.stdout.flush()
		print(result[1])
		sys.stdout.flush()
		
		## Enviar chave sha-2 do template para o node
		#print(sha2)
		#sys.stdout.flush()