## Script para concluir cadastro
## Link sobre comunicacao python nodejs: https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

## Estrutura do retorno: [flag_inicializacao, (positionNumber,accuracyScore)]

## Imports
import time, sys
from pyfingerprint.pyfingerprint import PyFingerprint


## Tenta inicializar o sensor
f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
if ( f.verifyPassword() == False ): ## Se nao conseguiu, flag de inicializacao = -1
    print(-1)
	sys.stdout.flush()
	exit(-1)
else								## Se conseguiu, flag de inicializacao = 0
	print(0)
	sys.stdout.flush()

## Espera leitura
while ( f.readImage() == False ):
    pass

## Converter a imagem recebida para atributos e armazenar em charbuffer1
f.convertImage(0x01)

## Checar se digital ja cadastrada
result = f.searchTemplate()
positionNumber = result[0]

## Digital ja cadastrada
if ( positionNumber >= 0 ):
    
	## Enviar mensagem de digital ja cadastrada pro node
	msg = (-1,-1)
	print(msg)
	sys.stdout.flush()

## Realizar cadastro da digital (talvez usar double check, por enquanto so le uma vez)
else:

	## Cria novo template
	f.createTemplate()

	## Salva template em novo lugar do array de templates
	positionNumber = f.storeTemplate()
	
	## Envia mensagem de cadastro concluido pro node
	msg = f.searchTemplate()
	print(msg)
	sys.stdout.flush()
