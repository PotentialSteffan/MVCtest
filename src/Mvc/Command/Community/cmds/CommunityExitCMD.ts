class CommunityExitCMD {
    public execute(notitify: any) {
        let facade = AppFacade.getInstance();
        let mediator: CommunityViewMediator = <CommunityViewMediator>(facade.retrieveMediator(CommunityViewMediator.NAME));

        facade.removeAllCommand();
        facade.removeMediator(CommunityViewMediator.NAME);

        if (mediator) {
            mediator.closeView()
        }

    }
}
