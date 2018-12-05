## Script para concluir cadastro
## Link sobre comunicacao python nodejs: https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

## Imports
import time
from pyfingerprint.pyfingerprint import PyFingerprint


print("Cadastro de digital")
sys.stdout.flush()

## Tenta inicializar o sensor
try:
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
	
	## Talvez mandar mensagem de erro pro node aqui
    if ( f.verifyPassword() == False ):
        raise ValueError('A senha do sensor esta errada!')

except Exception as e:
    print('O sensor nao foi inicializado!')
    print('Menssagem de excecao: ' + str(e))
    exit(1)
    
## Talvez mandar mensagem de aguardando digital pro node
## print('Coloque sua digital')

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
	msg = 'ja cadastrada'
	print(msg)
	sys.stdout.flush()

## Realizar cadastro da digital (talvez usar double check, por enquanto só lê uma vez)
else:

	## Cria novo template
	f.createTemplate()

	## Salva template em novo lugar do array de templates
	positionNumber = f.storeTemplate()
	
	## Envia mensagem de cadastro concluído pro node
	msg = 'concluido'
	print(msg)
	sys.stdout.flush()


	
## Verificar se o script roda concorrentemente
## Caso nao rodar e quiser double check, alterar script para: receber flag de qual é a leitura; enviar sha das leituras para o node fazer double check
	
## Aguardar para nova leitura
##time.sleep(2)

## Espera leitura da mesma digital
##while ( f.readImage() == False ):
    ##pass

## Converter a imagem recebida para atributos e armazenar em charbuffer 2
##f.convertImage(0x02)

## Compara os charbuffers
##if ( f.compareCharacteristics() == 0 ):
    
	## Enviar mensagem de cadastro nao concluído
	##msg = 'nao concluido'
	##print (msg)
	##sys.stdout.flush()

