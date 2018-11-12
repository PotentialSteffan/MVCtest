class CommunityStartupCMD {
    public static moduleName:string = "COMMUNITY";
    public execute(notitify: any) {
        let facade =AppFacade.getInstance();
        facade.registerCommand(CommunityConst.EXIT, CommunityExitCMD);
        let body = notitify.getBody()
        let proxy = facade.retrieveProxy(CommunityModel.NAME) as CommunityModel

        let theView = new CommunityView();
        let mediator = new CommunityViewMediator(theView
        );
        facade.registerMediator(mediator);

        theView.show();
    }
}
