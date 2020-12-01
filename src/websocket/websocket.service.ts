import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketService implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  afterInit(server: Socket ) {
    console.log('server');
  }

  // handleConnection(client: Socket, ...args: any[]) {
  //   console.log(client);
  // }
}
