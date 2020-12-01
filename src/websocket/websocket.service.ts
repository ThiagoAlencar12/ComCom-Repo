import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketService   {
  @WebSocketServer()
  private server: Server;



  // handleConnection(client: Socket, ...args: any[]) {
  //   console.log(client);
  // }
}
