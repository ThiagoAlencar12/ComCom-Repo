*** Comentários da aplicação ***

--- Users ---
Cadastro de Usuário()
Listagem de Uruário()
Alteração de Usuário()
Exclusão de Usuário()

--- Messages ---
Criação de Mensagem(Com id de quem esta enviando a mensagem): Relacionamento com tabela Users
Listagem de Mensagens(Todas as mensagens dentro da conversa): Relacionamento com Conversa
Exclusão de Mensagens(Oculta para o próprio usuário ou para todos)
Alteração de Mensagem(): Pendente avaliação

--- Emails ---
Criação de E-mails(Com id de quem esta enviando e com id de quem irá receber): Relacionamento com tabela Users
Listagem de E-mails()
Alteração de E-mails(): Pendente
Exclusão de E-mails(Só poderá apagar para quem enviou o e-mail)

--- Talks --- 
Conversa será criada quando um user primário, enviar uma mensagem para outro user(user secundario), fazendo assim a criação da conversa
Exclusão da mensagem: Ocultar a mensagem sem apagar o registro no banco de dados()
Busca por mensagens usando o id da conversa com o id da mensagem()

--- Group --- 
Criação de um grupo(Nome, Usuários)
Alteração de grupo()
Exclusão de um grupo()
Listagem de grupos()

--- Tabelas Pivos ---
talk_messages
group_messages

*** Relacionamentos ***
Users -> emails
Users -> messages
Users -> group
Users -> Talk
Talk -> talk_messages
Messages -> talk_messages
Messages -> group_messages
Group -> group_messagess

*** Casos a se pensar ***

- Listagem de mensagens e grupos pelas tabelas pivos()
- Na hora da criação de um grupo e das mensagens daquele grupo, armazenar na tabela pivo ambos os ids()
- Na hora da criação de uma conversa e das mensagens daquele conversa, armazenar na tabela pivo ambos os ids()
- Armazenar um array de ids na tabela Group()


*** Fazendo ***
[Feito] - Função de sender_id ser já o user logado
[Feito] - CRUD de E-mails
[Feito] - Relacionamento de E-mails com Users

[Fazendo] - Conversa
[Fazendo] - Grupos
[WebSockets(SocketIO)] - RealTime

arielbandeira
jose077
