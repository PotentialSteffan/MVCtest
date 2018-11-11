class CommunityViewMediator extends puremvc.Mediator {
    public static NAME: string = "CommunityViewMediator";

    private _clubDataProvider: eui.ArrayCollection;
    private _defaultSelectIndex: number = 0;

    constructor(view: any,
        clubDataProvider: eui.ArrayCollection,
        selectIndex: number = 0) {
        super(CommunityViewMediator.NAME, view);
        this._clubDataProvider = clubDataProvider;
        this._defaultSelectIndex = selectIndex;
    }
    public onRegister() {
        this.view.addEventListener(BaseComponent.INIT_COMPONENT_FINISH, this.initFinish, this);
    }
    public get view(): CommunityView {
        return this.getViewComponent()
    }
    public onRemove() {

        this.view["gameTabBar"].removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeTab, this);
        // this.view.getGameTab().dataProvider=null;
        this.onRemoveRoomListGroup();
    }

    public onCloseView() {
        // this.sendNotification(CreateRoomStaticType.EXIT_CREATE_ROOM, create_room.QUIT_TYPE.BACK)
        this.facade().sendNotification(CommunityConst.EXIT);
    }

    /** 关闭显示视图 **/
    public closeView(): void {
        this.view.removeEventListener(egret.Event.ENTER_FRAME, this.viewEnterFrame, this);
        this.view.removeEventListener(egret.Event.CLOSE, this.onCloseView, this);
        this.removeHead();
        this.view.getGameTab().dataProvider = null;
        this.view.getGameTab().removeChildren();
        this.view.removeEvent();
        if (this.view) {
            this.view.close();
        }
    }

    private _gameTabBar: eui.TabBar;
    // private _roomList: eui.List;
    private _roomListView: CommunityRoomListView;

    public initFinish(): void {
        this.view.removeEventListener(BaseComponent.INIT_COMPONENT_FINISH, this.initFinish, this);
        Utils.addBtnEvent(this.view["btn_back"], () => {
            this.facade().sendNotification(CommunityConst.EXIT);
        }, this, this)
        this.initTabList();

        //添加按钮显示添加弹出
        Utils.addBtnEvent(this.view["addGroup"], () => {
            this.view.showAddView();
        }, this, this);

        //关闭 添加弹出
        Utils.addBtnEvent(this.view["maskGroup"], () => {
            this.view.showAddView();
        }, this, this);


        //创建俱乐部按钮
        Utils.addBtnEvent(this.view["createClubGroup"], () => {
            AppFacade.getInstance().sendNotification(IndexViewMediator.LOBBY_QUERY_CREATE_PERMISSIONS_CS_MSG);
            ModulesManager.commonModule.showWaitResponseView(IndexViewMediator.LOBBY_QUERY_CREATE_PERMISSIONS_SC_MSG);
            this.view.showAddView();
        }, this, this);


        //加入按钮
        Utils.addBtnEvent(this.view["joinClubGroup"], () => {
            ModulesManager.joinClubModule.openWindow(JoinClubModule.QUERYCLUB);
            this.view.showAddView();
        }, this, this);



        //成员按钮
        Utils.addBtnEvent(this.view["userGroup"], () => {
            //to do
            let data = this._gameTabBar.selectedItem;
            // let data = { clubId: 10088 }
            if (data && data.clubId) {
                let info = { clubId: data.clubId, rootId: data.rootId }
                ModulesManager.managementClubModule.openWindow(ManagementClubModule.CLUBUSERLISTVIEW, info);
            }
        }, this, this)

        //统计按钮
        Utils.addBtnEvent(this.view["tjGroup"], () => {
            //to do
            let data = this._gameTabBar.selectedItem;
            if (data && data.clubId) {
                let info = { clubId: data.clubId };
                ModulesManager.managementClubModule.openWindow(ManagementClubModule.CLUBSTATISTICSVIEW, info);
            }
        }, this, this)

        //战绩按钮
        Utils.addBtnEvent(this.view["zjGroup"], () => {
            //to do
            let data = this._gameTabBar.selectedItem;
            if (data && data.clubId) {
                let info = { clubId: data.clubId, clubName: data.clubName, clubImg: data.clubImg };
                ModulesManager.createRoomModule.openWindow(CreateRoomModule.ZJLIST_VIEW, info);
            }
        }, this, this)
        //设置按钮
        Utils.addBtnEvent(this.view["setGroup"], () => {
            //TODO lzy
            let data = this._gameTabBar.selectedItem;
            if(data){
                //打开创建房间界面 --- 需要传入当前对应的俱乐部ID
                var gameInfo: any = GameKindIdType.getGameInfo(1);
                let kindIdList = [];
                if (data.clubData.szGameSetUnit && gameInfo) {
                    gameInfo.forEach(element => {
                        let tmpKindId: number = element.gameType;
                        data.clubData.szGameSetUnit.forEach(element222 => {
                            if (element222.iKindId == tmpKindId) {
                                kindIdList.push({ gameType: tmpKindId });
                                return false;
                            }
                        });
                    });
                }


            // var gameInfo: any = GameKindIdType.getGameInfo(1);  
                GameKindIdType.openGameCreateRoomByKinds( { games: kindIdList, 
                                                            selectIndex: 0 ,
                                                            gameType:CreateRoomStaticType.ROOM_TYPE_JIFEN,
                                                            clubId: data.clubId,
                                                            clubImg: data.clubImg,
                                                            clubName: data.clubName,
                                                            clubData:data.clubData,
                                                            isSetting:true
                                                            });

            }
        }, this, this)
        this.view.addEventListener(egret.Event.ENTER_FRAME, this.viewEnterFrame, this);
    }

    public viewEnterFrame(e: egret.Event) {
        if (this._gameTabBar) {
            let num = this._gameTabBar.numChildren
            for (let i = 0; i < num; i++) {
                let item = this._gameTabBar.getElementAt(i) as eui.ItemRenderer
                let head_item = item['headImg']

                if (item.data.clubImg != head_item.name) {
                    head_item.name = item.data.clubImg
                    Utils.removeHeadImg(head_item);
                    Utils.loadHeadImg(item.data.clubImg, head_item);
                }
            }
        }
    }

    public removeHead() {
        if (this._gameTabBar) {
            let num = this._gameTabBar.numChildren
            for (let i = 0; i < num; i++) {
                let item = this._gameTabBar.getElementAt(i) as eui.ItemRenderer
                let head_item = item['headImg']
                Utils.removeHeadImg(head_item);
            }
        }
    }


    private onRemoveRoomListGroup() {
        if (this._roomListView) {
            this._roomListView.closeView()
        }
        this._roomListView = null;
    }

    private onChangeTab(e: eui.ItemTapEvent): void {
        let data = this._gameTabBar.selectedItem;
        this.facade().sendNotification(CommunityConst.COMMUNITY_CHANGE_INDEX, this._gameTabBar.selectedIndex)
        let roomListGroup = this.view["roomListGroup"] as eui.Group;
        this.onRemoveRoomListGroup();
        roomListGroup.removeChildren();

        if (data && data.clubId) {
            // this.RequestRoomList(data.clubId);
            Utils.showLog("CommunityViewMediator :  当前选中的俱乐部ID：" + data.clubId);
            // 显示桌子列表界面
            //let dataInfo = {clubId:data.clubId,clubInfo:data.clubData}
            this._roomListView = new CommunityRoomListView(data);
            roomListGroup.addChild(this._roomListView);
            //刷新界面title
            this.view.showTitle();
        }
    }


    // private onAddStage(e: egret.Event) {
    //     this.view.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this)
    // }

    private onRemoveStage(e: egret.Event) {

    }

    private initTabList(): void {
        this._gameTabBar = this.view["gameTabBar"] as eui.TabBar;
        if (this._gameTabBar) {
            this._gameTabBar.selectedIndex = this._defaultSelectIndex;
            this._gameTabBar.dataProvider = this._clubDataProvider;
            this._gameTabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeTab, this);
        }

        this.onChangeTab(null);
    }


    private onChangeTabData(e: eui.UIEvent): void {

    }


    private RequestRoomList(theClubId: number) {
        var cmd = MessageClassMap.getcmd("CS_ClubTableList");
        var obj = GlobalProtoClass.get("ClubSubCmd_proto", "CS_ClubTableList");
        obj.ClubID = theClubId;
        obj.TableType = 1;
        obj.RoomId = 0;
        obj.UserId = UserData.userID;
        obj.GameCurrencyType = 3;
        GateClient.getInstance().sendCmd(cmd.cmd, cmd.subcmd, obj);
    }


    public listNotificationInterests(): string[] {
        return [
            CommunityConst.COMMUNITY_UPDATE_VIEW,
            CommunityConst.COMMUNITY_UPDATE_TABLE,
            CommunityConst.COMMUNITY_UPDATE_HOTPOINT,
            PublicNotification.Update_User_Basic_Info
        ]
    }

    public handleNotification(notification: puremvc.INotification): void {
        let name = notification.getName()
        switch (name) {
            case CommunityConst.COMMUNITY_UPDATE_VIEW:
                let clubData = notification.getBody();
                if (this._gameTabBar.selectedIndex == -1) {
                    this._gameTabBar.selectedIndex = this._defaultSelectIndex;
                }
                //请求当前俱乐部桌子列表
                let selectedItemData = this._gameTabBar.selectedItem;
                if (selectedItemData && selectedItemData.clubId) {
                    this.RequestRoomList(selectedItemData.clubId);
                }
                //刷新茶馆界面tableBar
                // this.view.refreshView();
                //刷新茶馆界面 以及桌子列表
                this.onChangeTab(null);
                break;
            case CommunityConst.COMMUNITY_UPDATE_TABLE:
                let data = notification.getBody()
                // this.view.updateTime(data);
                this._roomListView.updateRoomList();
                break;
            case CommunityConst.COMMUNITY_UPDATE_HOTPOINT:
                let hotPointData = notification.getBody()
                // this.view.updateTime(data);
                // this._detailView.refreshView();
                break;
            case PublicNotification.Update_User_Basic_Info:
                this.view.updateUserInfo();
                break;
        }
    }



}
