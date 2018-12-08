## Script para concluir cadastro
## Link sobre comunicacao python nodejs: https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

## Estrutura do retorno: [(positionNumber,accuracyScore)]

## Imports
import time, sys
from pyfingerprint.pyfingerprint import PyFingerprint

## Tenta inicializar o sensor
##f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
##if ( f.verifyPassword() == False ): ## Se nao conseguiu
  ##  print(-2)
	##sys.stdout.flush()
	##print(-2)
	##sys.stdout.flush()
	
##else							## Se conseguiu, flag de inicializacao = 0
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
	print(-1)
	sys.stdout.flush()
	print(-1)
	sys.stdout.flush()

## Realizar cadastro da digital
else:

	## Cria novo template
	f.createTemplate()

	## Salva template em novo lugar do array de templates
	positionNumber = f.storeTemplate()
	
	## Envia mensagem de cadastro concluido pro node
	result = f.searchTemplate()
	print(result[0])
	sys.stdout.flush()
	print(result[1])
	sys.stdout.flush()
