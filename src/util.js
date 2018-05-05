

export function getRedirectPath({type,avatar}) {
	//根据用户信息，返回跳转地址
	//user.type /boss /genius
	//user.avatar /bossinfo /geniusinfo   根据是否有头像跳转到相应界面
	let url = (type === 'boss')?'/boss':'/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}

export function getChatId(userId,targetId) {
	return [userId,targetId].sort().join('_')
}