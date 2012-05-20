/* 
 * һ������ ipv6 ��ַ�Ĺ��߿� * 
 * ���� javascript �Դ������ľ��ȵ����ƣ����Դ˿�󲿷ֵط����ַ������ݺͽ��� ipv6 ��ַ��
 * �й� javascript �ľ��ȿ����о���� http://lifesinger.wordpress.com/2011/03/07/js-precision/
 * 
 * ʹ�÷�����
 * ����ֱ�ӵ��ã��磺(new ipv6()).format('your ip');
 * �����Ԥ�����ַ���磺var myipv6 = new ipv6('your ip'); return myipv6.addr;
 */

/*
 * TODO:
 * ��ʽ��������ɶԶ� IP �Ĵ����� ::1
 * ��ɷ��������ַ�ķ����� function range(addr, distant, full)
 *
 */

function ipv6(str) {
  
  /*
  * ��ʽ�� ipv6 ��ַ, ���ؽ����ֵ��
  *    -1: ����� string;
  *    -2: ���зǷ��ַ�;
  *    -3: ��������;
  *    -4: ��ʽ����
  * addr: ������ַ�����������ַ�������Ϊ���¸�ʽ��
  *    "[2001:0:4a3f:74dc:30a6:a45f:2476:178c]"
  *    "2001:0:4a3f:74dc:30a6:a45f:2476:178c"
  *    "2001-0-4a3f-74dc-30a6-a45f-2476-178c"
  *    "200100004a3f74dc30a6a45f2476178c"
  * quote: ����Ƿ����������
  * separator: ָ��ԭʼ�ָ���, ��������
  */  
  this.format = function(addr,quote,separator) {
    if(typeof(addr)=="undefined") addr = this.addr;
    if(typeof(addr)!='string') return -1;
    if(separator) addr = addr.replace(separator,':');
    if(addr.replace(/\[|\]|:|\d|[a-f]/ig, '')!='') return -2;
    if(addr.replace(/\d|[a-f]/ig,'')=='' && addr.length==32) 
      addr = addr.replace(/(\d|[a-f]){4}(?!$)/g,function(n){return n+':';});
    else 
      addr = addr.replace(/\[|\]/g,'');
    var addr_arr = addr.split(':');
    if(addr_arr.length != 8) return -3;
    for(var i in addr_arr) {
      if(!addr_arr[i]) addr_arr[i] = 0;
      var item = addr_arr[i];
      if((item != 0 && !parseInt('0x'+item)) || (parseInt('0x'+item)>0xffff)) return -4;
    }  
    return quote?'['+addr+']':addr;
  }

  /*
  * ������ð��δ�ָ��ߵ�����,
  * check: �Ƿ��ȼ���ַ�Ƿ���ϱ�׼
  */
  this.arr = function(addr,check) {
    if(typeof(addr)=="undefined") addr = this.addr;
    addr = check?this.format(addr):addr;
    return addr.split(':');
  }

  this.addr = this.format(str);
  
  /*
  * ����
  */
  return this;
}
