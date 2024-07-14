
class PeerService {
    constructor(){
        if(!this.peer){
            this.peer=new RTCPeerConnection({
                iceServers:[{
                    urls:[
                        'stun:stun.l.google.com:19302',
                        'stun:global.stun.twilio.com:3478'
                    ]
                }]
            })
        }
    }

    // to get the connection from the server 
    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }

    // to send the offer to the server
    async getAnswer(offer){
        if(this.peer){
            await this.peer.setRemoteDescription(offer);
            const answer=await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(answer));
            return answer;
        }
    }

    // to handle the ice candidate
    async setLocalDescription(answer){
        if(this.peer){
            await this.peer.setRemoteDescription(new RTCSessionDescription(answer))
        }
    }
    

 
}

export default new PeerService();