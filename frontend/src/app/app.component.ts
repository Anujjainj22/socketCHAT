import { group } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('popup', {static: false}) popup: any;

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen = false;
  public phone: string;
  public currentUser;
  public selectedUser;
 

  public chats = [
    {
      isGroupChat: false,
      users: [
        {
          name: "John Doe",
          email: "john@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
      ],
      messages:[],
      _id: "617a077e18c25468bc7c4dd4",
      chatName: "John Doe",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Guest User",
          email: "guest@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
      ],
      _id: "617a077e18c25468b27c4dd4",
      messages:[],
      chatName: "Guest User",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Anthony",
          email: "anthony@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
      ],
      _id: "617a077e18c2d468bc7c4dd4",
      messages:[],
      chatName: "Anthony",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "John Doe",
          email: "jon@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
        {
          name: "Guest User",
          email: "guest@example.com",
        },
      ],
      _id: "617a518c4081150716472c78",
      chatName: "Friends",
      messages:[],
      groupAdmin: {
        name: "Guest User",
        email: "guest@example.com",
      },
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Jane Doe",
          email: "jane@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
      ],
      _id: "617a077e18c25468bc7cfdd4",
      messages:[],
      chatName: "Jane Doe",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "John Doe",
          email: "jon@example.com",
        },
        {
          name: "Piyush",
          email: "piyush@example.com",
        },
        {
          name: "Guest User",
          email: "guest@example.com",
        },
      ],
      _id: "617a518c4081150016472c78",
      messages:[],
      chatName: "Chill Zone",
      groupAdmin: {
        name: "Guest User",
        email: "guest@example.com",
      },
    },
  ];
 
 
 
  public groupList =[
    {
      id: 1,
      name: 'group1',
      image: "https://th.bing.com/th?id=OIP.JzfMMdGGxHVW3zepnVulsgHaHw&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      members: ['The Swag Coder','Wade Warren']
    }
  ]



  public userList = [
    {
      id: 1,
      name: 'The Swag Coder',
      phone: '1',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
        5:'room-4',
      }
    },
    {
      id: 2,
      name: 'Wade Warren',
      phone: '9876543210',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
        5: 'room-6'
      }
    },
    {
      id: 3,
      name: 'Albert Flores',
      phone: '9988776655',
      image: 'assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
        5: 'room-7'
      }
    },
    {
      id: 4,
      name: 'Dianne Russell',
      phone: '9876556789',
      image: 'assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6',
        5:'room-7'
      }
    },
    {
      id: 5,
      name: 'Anuj jain',
      phone: '8821017898',
      image: 'https://th.bing.com/th/id/OIP.L8jhtsf-jCIV4MMnYKAxPwHaFb?w=245&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      roomId: {
        1: 'room-4',
        3: 'room-6',
        4: 'room-7',
        2: 'room-2'
      }
    }
  ];
  private logger = new Subject<any>();
  selectedGroup: any;
  isGroup: boolean;
  currentUserName: any;
  selectedUserName: any;
  GroupsChat: ({ isGroupChat: boolean; users: { name: string; email: string; }[]; messages: any[]; _id: string; chatName: string; groupAdmin?: undefined; } | { isGroupChat: boolean; users: { name: string; email: string; }[]; _id: string; chatName: string; messages: any[]; groupAdmin: { name: string; email: string; }; })[];
  personal: ({ isGroupChat: boolean; users: { name: string; email: string; }[]; messages: any[]; _id: string; chatName: string; groupAdmin?: undefined; } | { isGroupChat: boolean; users: { name: string; email: string; }[]; _id: string; chatName: string; messages: any[]; groupAdmin: { name: string; email: string; }; })[];
  selectedChatDetails: {
    isGroupChat: boolean; users: {
      name: string; email: string;
    }[]; messages: any[]; _id: string; chatName: string; groupAdmin?: undefined;
  } | {
    isGroupChat: boolean; users: {
      name: string; email: string;
    }[]; _id: string; chatName: string; messages: any[]; groupAdmin: {
      name: string; email: string;
    };
  };
 
  constructor(
    private modalService: NgbModal,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {


    this.GroupsChat = this.chats.filter(c=>c.isGroupChat===true)
    this.personal = this.chats.filter(c=>c.isGroupChat===false)
    console.log(this.GroupsChat , this.personal);
    
    this.chatService.getGroupsMessage().subscribe(data=>
      {
        if(this.isGroup)
        {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorageGroup();
            const storeIndex = this.storageArray
              .findIndex((storage) => storage.groupName === this.selectedUser.name);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      })


    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        // this.messageArray.push(data);
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray
              .findIndex((storage) => storage.roomId === this.roomId);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });
  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  login(dismiss: any): void {
    this.currentUser = this.userList.find(user => user.phone === this.phone.toString());
    this.userList = this.userList.filter((user) => user.phone !== this.phone.toString());
    this.groupList= this.groupList.filter((group)=>group.members.includes(this.currentUser.name))
    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }


  selectGroupHandlerAnuj(chatName:string)
  {
  this.selectedUser=true
  let  selectedGroup= this.GroupsChat.find(c=>c.chatName==chatName);
  let messages = selectedGroup.messages
  this.selectedChatDetails= selectedGroup;
   this.messageArray = messages;
  console.log(selectedGroup , this.messageArray);
  }

  
  selectUserHandlerAnuj(users)
  {
    let usersInChat = users;
    console.log(usersInChat); 
    this.selectedUser=true;
    let  selectedChat= this.personal.find(c=>c.users==users);
    this.selectedChatDetails= selectedChat;
    console.log(selectedChat);
    this.messageArray = this.selectedChatDetails.messages
  }

  // sendMessageToGroupAnuj(selectedGroup)
  // { 
  //   this.selectedChatDetails.messages.push({user: "Anuj jain", message: "hi"})
  //   console.log("sdfvsff",this.chats);
    
  // }

  // sendMessageAnuj(selectedGroup)
  // { console.log(this.selectedChatDetails);
  //   this.selectedChatDetails.messages.push({user: "Anuj jain", message: "hi"})
  //   this.messageArray= this.selectedChatDetails.messages
  //   console.log("sdfvsff",this.chats);
  //   this.chatService.setChats(this.chats)
  //  // localStorage.setItem("data", JSON.stringify(this.chats));
  // }





  selectGroupHandler(groupName)
  { this.isGroup=true;
    this.selectedUser= this.groupList.find(g=> g.name===groupName);
    console.log(groupName,this.selectedUser.name);
    this.messageArray=[]
    this.storageArray = this.chatService.getStorageGroup();
    this.messageArray = this.storageArray.find(data=>data.groupName===groupName).chats
    console.log(this.isGroup);
    console.log(this.storageArray);
    this.joinGroup([this.currentUser.name,], groupName);
    console.log(this.isGroup);
  }
 






  selectUserHandler(phone: string): void {
    this.isGroup= false;
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.selectedUserName = this.selectedUser.name;
    this.currentUserName = this.currentUser.name; 
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];
    this.storageArray = this.chatService.getStorage();
    console.log(this.storageArray);
    
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
    console.log(this.isGroup);

  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  joinGroup(userNames:any[], groupName:string):void
  {
    this.chatService.joinRoom({user: userNames, room: groupName});
  }


 
  


  sendMessageToGroup(selectedGroup)
  {
  console.log("group");
  this.chatService.getGroupsMessage()
    this.chatService.sendMessageToGroup({
      user: this.currentUser.name,
      groupName:this.selectedUser,
      message: this.messageText
    })
    this.storageArray = this.chatService.getStorageGroup();
    console.log("storageAraay",this.storageArray);
    const storeIndex = this.storageArray
    .findIndex((storage) => storage.groupName === this.selectedUser.name );
    console.log("storeindex",storeIndex);
    
    if (storeIndex > -1) {
      console.log("if");
      console.log({
        user: this.currentUser.name,
        message: this.messageText
      });
      this.messageArray.push({
        user: this.currentUser.name,
        message: this.messageText
      })
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    }
    else {
      console.log("else");
      const updateStorage = {
        groupName: this.selectedUser.name,
        members: this.selectedUser.members,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText,
          name:"anuj"
        }]
      };
      console.log(this.storageArray);
      this.storageArray.push(updateStorage);
      console.log(this.storageArray);
      console.log(updateStorage);

      
    }
    this.chatService.setStorageGroups(this.storageArray);
    this.messageText = '';
  }

  sendMessage(): void {
    console.log("onetoone");
    
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
      console.log(this.storageArray);
      
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
  

}
