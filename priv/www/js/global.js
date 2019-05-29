///////////////////////
//                   //
// Genuine constants //
//                   //
///////////////////////

// Just used below
function map(list) {
    var res = {};
    for (i in list) {
        res[list[i]] = '';
    }
    return res;
}

// Extension arguments that we know about and present specially in the UI.
var KNOWN_ARGS = {'alternate-exchange':        {'short': 'AE',  'type': 'string'},
                  'x-message-ttl':             {'short': 'TTL', 'type': 'int'},
                  'x-expires':                 {'short': 'Exp', 'type': 'int'},
                  'x-max-length':              {'short': 'Lim', 'type': 'int'},
                  'x-max-length-bytes':        {'short': 'Lim B', 'type': 'int'},
                  'x-overflow':                {'short': 'Ovfl', 'type': 'string'},
                  'x-dead-letter-exchange':    {'short': 'DLX', 'type': 'string'},
                  'x-dead-letter-routing-key': {'short': 'DLK', 'type': 'string'},
                  'x-queue-master-locator':    {'short': 'ML', 'type': 'string'},
                  'x-max-priority':            {'short': 'Pri', 'type': 'int'}};

// Things that are like arguments that we format the same way in listings.
var IMPLICIT_ARGS = {'durable':         {'short': 'D',    'type': 'boolean'},
                     'auto-delete':     {'short': 'AD',   'type': 'boolean'},
                     'internal':        {'short': 'I',    'type': 'boolean'},
                     'exclusive':       {'short': 'Excl', 'type': 'boolean'},
                     'messages delayed':{'short': 'DM',   'type': 'int'}};

// Both the above
var ALL_ARGS = {};
for (var k in IMPLICIT_ARGS) ALL_ARGS[k] = IMPLICIT_ARGS[k];
for (var k in KNOWN_ARGS)    ALL_ARGS[k] = KNOWN_ARGS[k];

var NAVIGATION = {'概览':    ['#/',            "management"],
    '连接': ['#/connections', "management"],
    '通道':    ['#/channels',    "management"],
    '交换':   ['#/exchanges',   "management"],
    '队列':      ['#/queues',      "management"],
    '管理':
        [{'用户':         ['#/users',              "administrator"],
            '虚拟主机': ['#/vhosts',             "administrator"],
            '策略':      ['#/policies',           "management"],
            '限制':        ['#/limits',   "management"],
            '集群':       ['#/cluster-name',       "administrator"]},
            "management"]
};

var CHART_RANGES = {'global': [], 'basic': []};
var ALL_CHART_RANGES = {};

var COLUMNS =
    {'exchanges' :
     {'概览': [['type',                 'Type',                   true],
                   ['features',             'Features (with policy)', true],
                   ['features_no_policy',   'Features (no policy)',   false],
                   ['policy',               'Policy',                 false]],
      '消息率': [['rate-in',         'rate in',                true],
                        ['rate-out',        'rate out',               true]]},
     'queues' :
     {'概览': [['features',             'Features (with policy)', true],
                   ['features_no_policy',   'Features (no policy)',   false],
                   ['policy',               'Policy',                 false],
                   ['consumers',            'Consumer count',         false],
                   ['consumer_utilisation', 'Consumer utilisation',   false],
                   ['state',                'State',                  true]],
      '消息': [['msgs-ready',      'Ready',          true],
                   ['msgs-unacked',    'Unacknowledged', true],
                   ['msgs-ram',        'In memory',      false],
                   ['msgs-persistent', 'Persistent',     false],
                   ['msgs-total',      'Total',          true]],
      '消息比特': [['msg-bytes-ready',      'Ready',          false],
                        ['msg-bytes-unacked',    'Unacknowledged', false],
                        ['msg-bytes-ram',        'In memory',      false],
                        ['msg-bytes-persistent', 'Persistent',     false],
                        ['msg-bytes-total',      'Total',          false]],
      '消息率': [['rate-incoming',  'incoming',      true],
                        ['rate-deliver',   'deliver / get', true],
                        ['rate-redeliver', 'redelivered',   false],
                        ['rate-ack',       'ack',           true]]},
     'channels' :
     {'概览': [['user',  'User name', true],
                   ['mode',  'Mode',      true],
                   ['state', 'State',     true]],
      '详情': [['msgs-unconfirmed', 'Unconfirmed', true],
                  ['prefetch',         'Prefetch',    true],
                  ['msgs-unacked',     'Unacked',     true]],
      '事务': [['msgs-uncommitted', 'Msgs uncommitted', false],
                       ['acks-uncommitted', 'Acks uncommitted', false]],
      '消息率': [['rate-publish',   'publish',            true],
                        ['rate-confirm',   'confirm',            true],
                        ['rate-return',    'return (mandatory)', false],
                        ['rate-deliver',   'deliver / get',      true],
                        ['rate-redeliver', 'redelivered',        false],
                        ['rate-ack',       'ack',                true]]},
     'connections':
     {'概览': [['user',   'User name', true],
                   ['state',  'State',     true]],
      '详情': [['ssl',            'SSL / TLS',      true],
                  ['ssl_info',       'SSL Details',    false],
                  ['protocol',       'Protocol',       true],
                  ['channels',       'Channels',       true],
                  ['channel_max',    'Channel max',    false],
                  ['frame_max',      'Frame max',      false],
                  ['auth_mechanism', 'Auth mechanism', false],
                  ['client',         'Client',         false]],
      '网络': [['from_client',  'From client',  true],
                  ['to_client',    'To client',    true],
                  ['heartbeat',    'Heartbeat',    false],
                  ['connected_at', 'Connected at', false]]},

     'vhosts':
     {'概览': [['cluster-state',   'Cluster state',  false]],
      '消息': [['msgs-ready',      'Ready',          true],
                   ['msgs-unacked',    'Unacknowledged', true],
                   ['msgs-total',      'Total',          true]],
      '网络': [['from_client',  'From client',  true],
                  ['to_client',    'To client',    true]],
      '消息率': [['rate-publish', 'publish',       true],
                        ['rate-deliver', 'deliver / get', true]]},
     'overview':
     {'Statistics': [['file_descriptors',   'File descriptors',   true],
                     ['socket_descriptors', 'Socket descriptors', true],
                     ['erlang_processes',   'Erlang processes',   true],
                     ['memory',             'Memory',             true],
                     ['disk_space',         'Disk space',         true]],
      'General': [['uptime',    'Uptime',       true],
                  ['info',      'Info',         true],
                  ['reset_stats',     'Reset stats',        true]]}};

// All help ? popups
var HELP = {
    'exchange-auto-delete':
      '如果是, 则在至少一个队列或交换已绑定到此队列或交换之后, 交换将自行删除, 然后所有队列或交换都已解除绑定.',

    'exchange-internal':
      '如果是, 客户端无法直接发布到此交换. 它只能与交换一起用于交换绑定.',

    'exchange-alternate':
      '如果无法以其他方式路由到此交换的邮件, 请将其发送到此处指定的备用交换机.<br/>(设置 "<a target="_blank" href="http://rabbitmq.com/ae.html">alternate-exchange</a>" 参数.)',

    'queue-message-ttl':
    '发布到队列的消息在丢弃之前可以存活多长时间（毫秒）.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/ttl.html#per-queue-message-ttl">x-message-ttl</a>" 参数.)',

    'queue-expires':
      '在自动删除队列（毫秒）之前,队列可以使用多长时间.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/ttl.html#queue-ttl">x-expires</a>" 参数.)',

    'queue-max-length':
      '在队列开始从队列中删除之前,队列可以包含多少（就绪）消息.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/maxlength.html">x-max-length</a>" 参数.)',

    'queue-max-length-bytes':
      '队列在开始从头部删除之前可以包含的就绪消息的总体大小.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/maxlength.html">x-max-length-bytes</a>" 参数.)',

    'queue-auto-delete':
      '如果是,则在至少一个消费者已连接之后,队列将自行删除,然后所有消费者都已断开连接.',

    'queue-dead-letter-exchange':
      '交换的可选名称,如果邮件被拒绝或过期,将重新发布这些名称.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/dlx.html">x-dead-letter-exchange</a>" 参数.)',

    'queue-dead-letter-routing-key':
      '可选的替换路由密钥,用于在邮件以字母为单位时使用. 如果未设置,将使用消息的原始路由密钥.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/dlx.html">x-dead-letter-routing-key</a>" 参数.)',

    'queue-max-priority':
      '要支持的队列的最大优先级数; 如果未设置,队列将不支持消息优先级.<br/>(设定 "<a target="_blank" href="http://rabbitmq.com/priority.html">x-max-priority</a>" 参数.)',

    'queue-lazy':
      '将队列设置为延迟模式,在磁盘上保留尽可能多的消息以减少RAM使用; 如果未设置,队列将保留内存缓存以尽快传递消息.<br/>(设定 "<a target="_blank" href="https://www.rabbitmq.com/lazy-queues.html">x-queue-mode</a>" 参数.)',

    'queue-overflow':
      '设定 <a target="_blank" href="https://www.rabbitmq.com/maxlength.html#overflow-behaviour">队列溢出行为</a>. 这确定了在达到队列的最大长度时消息会发生什么. 可用值参见 <code>drop-head</code> 或 <code>reject-publish</code>.',

    'queue-master-locator':
       '将队列设置为主位置模式,确定在节点集群上声明时队列主机所在的规则.<br/>(设定 "<a target="_blank" href="https://www.rabbitmq.com/ha.html">x-queue-master-locator</a>" 参数.)',

    'queue-messages':
      '<p>消息数量.</p><p>注意 "in memory" 和 "persistent" 不是互相排斥的; 持久性消息可以在内存和光盘上,如果内存紧张,可以分页瞬态消息. 非持久队列会将所有消息视为瞬态消息.</p>',

    'queue-message-body-bytes':
      '<p>此队列中邮件正文大小的总和. 这仅对消息体进行计数; 它不包括队列使用的消息属性（包括标头）或元数据.</p><p>注意 "in memory" 和 "persistent" 不是相互排斥的; 持久性消息可以在内存和光盘上,如果内存紧张,可以分页瞬态消息. 非持久队列会将所有消息视为瞬态消息.</p><p>如果消息在发布时被路由到多个队列,则其主体将仅存储一次（在内存和磁盘上）并在队列之间共享. 此处显示的值未考虑此效果.</p>',

    'queue-process-memory':
      '此队列进程使用的总内存. 这不包括内存中的消息体（可以在队列之间共享,并且将出现在全局“二进制文件”内存中）,但确实包含其他所有内容.',

    'queue-consumer-utilisation':
      '队列能够立即向消费者传递消息的时间的一部分. 如果此数字小于100％,可以更快地传递消息, 如果: \
        <ul> \
          <li>有更多的消费者或</li> \
          <li>消费者更快或</li> \
          <li>消费者的预取计数更高</li> \
        </ul>',

    'internal-users-only':
      '此处仅显示内部RabbitMQ数据库中的用户. 其他用户（例如通过LDAP验证的用户）将不会出现.',

    'export-definitions':
    '定义包括用户,虚拟机,权限,参数,交换,队列和绑定. 它们不包括队列内容或群集名称. 不会导出独占队列.',

    'export-definitions-vhost':
    '为单个虚拟机导出的定义包括交换,队列,绑定和策略.',

    'import-definitions':
      '导入的定义将与当前定义合并. 如果在导入期间发生错误,则不会回滚所做的任何更改.',

    'import-definitions-vhost':
    '对于单个虚拟机,仅导入交换,队列,绑定和策略.',

    'exchange-rates-incoming':
      '传入速率是消息直接发布到此交换的速率.',

    'exchange-rates-outgoing':
      '传出速率是消息进入队列的速率,已直接发布到此交换.',

    'channel-mode':
      '渠道保证模式. 可以是以下之一,也可以不是：<br/> \
      <dl> \
        <dt><abbr title="Confirm">C</abbr> &ndash; <a target="_blank" href="http://www.rabbitmq.com/confirms.html">确认</a></dt> \
        <dd>频道将发送流媒体发布确认.</dd> \
        <dt><abbr title="Transactional">T</abbr> &ndash; <a target="_blank" href="http://www.rabbitmq.com/amqp-0-9-1-reference.html#class.tx">事物的</a></dt> \
        <dd>通道是事务的.</dd> \
      </dl>',

    'channel-prefetch':
      '通道预获取量. \
       <p> \
		 每个通道可以有两个预取计数：每个消费者计数,这将限制在通道上创建的每个 \
		 新消费者,以及全局计数,该通道在通道上的所有消费者之间共享.\
       </p> \
       <p> \
         此列显示一个,另一个或两个限制（如果已设置）. \
       </p>',

    'file-descriptors':
      '<p>文件描述符计数和限制,由操作系统报告. 计数包括网络套接字和文件句柄.</p> \
      <p>为了优化磁盘访问,RabbitMQ使用尽可能多的自由描述符,因此计数可以安全地接近极限.\
	  但是,如果套接字使用大多数文件描述符,则持久性能将受到负面影响.</p> \
      <p>要在 Unix / Linux 上改变限制, 使用 "ulimit -n". 要在 \
      Windows 上改变限制, 设定 ERL_MAX_PORTS 环境变量</p> \
      <p>要在Windows中报告使用的文件句柄数量, handle.exe 工具必须在路径上. 可以从此处 \
      <a target="_blank" href="http://technet.microsoft.com/en-us/sysinternals/bb896655">下载</a>.</p>',

    'socket-descriptors':
      'RabbitMQ管理的网络套接字计数和限制.<br/> \
      当限制用尽时,RabbitMQ将停止接受新的网络连接.',

    'memory-alarm':
      '<p>关于此节点的 <a target="_blank" href="http://www.rabbitmq.com/memory.html#memsup">内存报警 \
      </a> 已关闭. 它会阻塞 incoming network traffic until the memory usage drops below \
      the watermark传入的网络流量,直到内存使用率降至限值以下.</p>\
      <p>请注意,在这种情况下,白线表示与总共使用了多少内存有关的高水印.</p>',

    'disk-free-alarm':
      '关于此节点的 <a target="_blank" href="http://www.rabbitmq.com/memory.html#diskfreesup">磁盘空间报警</a> 已关闭.\
	  它将阻止传入的网络流量,直到可用空间量超过限制.',

    'message-get-requeue':
      '<p>点击 "获取消息" 将会从此消息队列消费消息. \
      如果设置了requeue,则消息将被放回到队列中,但是将在消息上设置“redelivered”.</p> \
      <p>如果未设置重新排队,则将从队列中删除消息.</p> \
      <p>此外,消息有效负载将被截断为50000字节.</p>',

    'message-publish-headers':
      '标题可以有任何名称. 这里只能设置长字符串标题.',

    'message-publish-properties':
      '<p>您可以在此处设置其他消息属性（交付模式和标题是最常见的情况）.</p>\
      <p>无效的属性将被忽略. 有效的属性是：</p>\
      <ul>\
      <li>content_type</li>\
      <li>content_encoding</li>\
      <li>priority</li>\
      <li>correlation_id</li>\
      <li>reply_to</li>\
      <li>expiration</li>\
      <li>message_id</li>\
      <li>timestamp</li>\
      <li>type</li>\
      <li>user_id</li>\
      <li>app_id</li>\
      <li>cluster_id</li>\
      </ul>',

    'string-base64':
    '<p>AMQP消息有效负载可以包含任何二进制内容. 他们能 \
      因此很难在浏览器中显示. 选项在这里具有以下含义：</p> \
     <dl> \
       <dt>自动 string / base64</dt> \
       <dd>如果消息有效负载可以解释为UTF-8编码的字符串,请执行此操作.\
	   否则返回编码为base64的有效负载.</dd> \
       <dt>base64</dt> \
       <dd>无条件地返回编码为base64的有效负载.</dd> \
     </dl>',

    'user-tags':
      '以逗号分隔的标签列表,应用于用户. 当前 \
       <a target="_blank" href="http://www.rabbitmq.com/management.html#permissions">被management插件支持</a>: \
      <dl> \
        <dt>管理</dt> \
        <dd> \
          用户可以访问管理插件 \
        </dd> \
        <dt>策略制订</dt> \
        <dd> \
          用户可以访问管理插件并管理他们有权访问虚拟机的策略和参数.\
        </dd> \
        <dt>监控</dt> \
        <dd> \
         用户可以访问管理插件并查看所有连接和通道以及与节点相关的信息.\
        </dd> \
        <dt>administrator</dt> \
        <dd> \
		用户可以执行监控可以执行的所有操作,管理用户,虚拟机和权限,\
		关闭其他用户的连接以及管理所有虚拟机的策略和参数.\
        </dd> \
      </dl> \
      <p> \
		请注意,您可以在此处设置任何标记; 以上四个标签的链接只是为了方便.\
      </p>',

    'queued-messages':
      '<dl>                          \
        <dt>就绪</dt>\
        <dd>现在可以传递的消息数.</dd>\
        <dt>未确认</dt>\
        <dd>服务器等待确认的消息数.</dd>\
        <dt>合计</dt>\
        <dd>这两个数字的总和.</dd>\
      </dl>',

    'message-rates':
    '仅显示正在进行某些活动的率.\
      <dl>\
        <dt>发布</dt>\
        <dd>消息进入服务器的速率.</dd>\
        <dt>发布确认</dt>\
        <dd>服务器确认发布的速率.</dd>\
        <dt>交付（手动确认）</dt>\
        <dd>将消息传递给使用手动确认的使用者的速率.</dd>\
        <dt>交付（自动确认）</dt>\
        <dd>将消息传递给使用自动确认的使用者的速率.</dd>\
        <dt>消费者应答</dt>\
        <dd>消费者确认消息的速率.</dd>\
        <dt>交还</dt>\
        <dd>正在传递带有“重新传送”标志的消息的速率. 请注意,这些消息<b>也</b>会计入上述其中一种投放率.</dd>\
        <dt>获得（手动确认）</dt>\
        <dd>响应basic.get传递要求确认的消息的速率.</dd>\
        <dt>获得 (自动确认)</dt>\
        <dd>响应basic.get而传递不需要确认的消息的速率.</dd>\
        <dt>返回</dt>\
        <dd>对于使用\'mandatory \'标志集发布的不可路由消息,将basic.return发送给发布者的速率.</dd>\
        <dt>读磁盘</dt>\
        <dd>队列从磁盘读取消息的速率.</dd>\
        <dt>写磁盘</dt>\
        <dd>队列将消息写入磁盘的速率.</dd>\
      </dl>\
      <p>\
        请注意,最后两个项目来自队列而不是通道; 因此,它们可能与其他统计数据略有不同步.\
      </p>',

    'disk-monitoring-no-watermark' : '没有设定 <a target="_blank" href="http://www.rabbitmq.com/memory.html#diskfreesup">磁盘空间低限</a>. RabbitMQ不会采取任何措施来避免磁盘空间不足.',

    'resource-counts' : '显示当前用户有权访问的所有虚拟机的对象总数.',

    'memory-use' : '<p>请注意,此处显示的内存详细信息仅在请求时更新 - 在繁忙的服务器上每隔几秒计算一次可能太昂贵.</p><p><a target="_blank" href="http://www.rabbitmq.com/memory-use.html">阅读更多</a> 关于内存使用.</p>',

    'memory-calculation-strategy-breakdown' : '<p>参数 <code>vm_memory_calculation_strategy</code> 定义使用以下哪些内存值来检查内存使用情况是否达到水印或是否需要分页到磁盘.</p><p><a target="_blank" href="http://www.rabbitmq.com/memory-use.html">阅读更多</a> 关于内存使用.</p>',

    'memory-calculation-strategy' : '<p>可以使用不同的策略计算 <code>vm_memory_calculation_strategy</code> 配置.</p><p><a target="_blank" href="http://www.rabbitmq.com/memory-use.html">阅读更多</a> 关于内存使用.</p>',

    'binary-use' : '<p>二元会计不准确; 二进制文件在进程之间共享（因此相同的二进制文件可能会被计入多个部分）,并且VM不允许我们跟踪与进程无关的二进制文件（因此某些二进制文件可能根本不会出现）.</p>',

    'policy-ha-mode' : '<code>all</code> (镜像到集群中的所有节点), <code>exactly</code> (镜像到一定数量的节点) or <code>nodes</code> (镜像到明确的节点列表). 如果您选择后两者之一,您还必须设置 <code>ha-params</code>.',

    'policy-ha-params' : '当<code>ha-mode</code> 为 <code>all</code> 时不存在, \
    当 <code>ha-mode</code> 为 <code>exactly</code>时是数字,\
    当<code>ha-mode</code> 为 <code>nodes</code>时是一组字符串.',

    'policy-ha-sync-mode' : '<code>manual</code> 或 <code>automatic</code> 中的一个. <a target="_blank" href="http://www.rabbitmq.com/ha.html#unsynchronised-mirrors">更多</a>',

    'policy-ha-promote-on-shutdown' : '<code>when-synced</code> 或 <code>always</code> 中的一个. <a target="_blank" href="http://www.rabbitmq.com/ha.html#unsynchronised-mirrors">更多</a>',

    'policy-ha-promote-on-failure' : '<code>when-synced</code> 或 <code>always</code>中的一个. <a target="_blank" href="http://www.rabbitmq.com/ha.html#unsynchronised-mirrors">更多</a>',

    'policy-federation-upstream-set' :
    '字符串; 仅当联合插件已启用时. 选择要与联合使用的一组上游的名称,或选择“all”以使用所有上游.与 <code>federation-upstream</code>不相容.',

    'policy-federation-upstream' :
    '字符串; 仅当联合插件已启用时. 选择要用于联合的特定上游集. 与 <code>federation-upstream-set</code> 不相容.',

    'handle-exe' : '为在Windows上监视文件描述被打开的数量,RabbitMQ需要Microsoft的<a href="http://technet.microsoft.com/en-us/sysinternals/bb896655" target="_blank">handle.exe</a>命令行工具. 下载并将其放在路径中（例如在C:\Windows中）.',

    'filter-regex' :
    '是否启用正则表达式匹配. 字符串文字和正则表达式都以不区分大小写的方式匹配.<br/></br/> \
    (<a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions" target="_blank">正则表达式参考</a>)',

    'plugins' :
    '请注意,此处仅显示明确启用和运行的插件.',

    'io-operations':
    'I / O操作速率. 此处仅显示由消息持久性执行的操作（例如,Mnesia中的元数据更改或未显示对日志文件的写入）.\
      <dl>\
        <dt>读</dt>\
        <dd>从磁盘读取数据的速率.</dd>\
        <dt>写</dt>\
        <dd>将数据写入磁盘的速率.</dd>\
        <dt>寻找</dt>\
        <dd>代理在读取或写入磁盘时切换位置的速率.</dd>\
        <dt>同步</dt>\
        <dd>Broker调用的比率 <code>fsync()</code> 确认数据刷新到磁盘.</dd>\
        <dt>重开</dt>\
        <dd>代理回收文件句柄的速率,以支持比文件句柄更多的队列. 如果此操作频繁发生,则可以通过增加可用的文件句柄数来提高性能.</dd>\
      </dl>',

    'mnesia-transactions':
    '在此节点上启动Mnesia事务的速率（此节点还将参与在其他节点上启动的Mnesia事务）.\
      <dl>\
        <dt>内存</dt>\
        <dd>仅RAM事务发生的速率（例如,创建/删除瞬态队列）.</dd>\
        <dt>磁盘</dt>\
        <dd>磁盘（和RAM）事务发生的速率（例如: 创建/删除持久队列）.</dd>\
      </dl>',

    'persister-operations-msg':
    '在此节点上进行每个消息持久性操作的速率.更多信息请参见<a href="http://www.rabbitmq.com/persistence-conf.html" target="_blank">持久化</a> \
      <dl>\
        <dt>QI 日志</dt>\
        <dd>将消息信息（发布,交付和确认）写入队列索引日志的速率.</dd>\
        <dt>存储读</dt>\
        <dd>从消息存储中读取消息的速率.</dd>\
        <dt>存储写</dt>\
        <dd>将消息写入消息存储中的速率.</dd>\
      </dl>',

    'persister-operations-bulk':
    '整个文件持久性操作在此节点上进行的速率. 更多信息请参见 \
     <a href="http://www.rabbitmq.com/persistence-conf.html" target="_blank">持久化</a>.\
      <dl>\
        <dt>QI 读</dt>\
        <dd>读取队列索引段文件的速率.</dd>\
        <dt>QI 写</dt>\
        <dd>写入队列索引段文件的速率.</dd>\
      </dl>',

    'gc-operations':
    '在此节点上进行垃圾收集操作的速率.',

    'gc-bytes':
    '此节点上的垃圾回收器回收内存的速率.',

    'context-switches-operations':
    '在此节点上进行运行时上下文切换的速率.',

    'process-reductions':
    '在此过程中减少的比率.',

    'connection-operations':
    ' <dl>\
        <dt>已创建</dt>\
        <dd>创建连接的速率.</dd>\
        <dt>已关闭</dt>\
        <dd>连接关闭的速率.</dd>\
      </dl> ',

    'channel-operations':
    ' <dl>\
        <dt>已创建</dt>\
        <dd>通道创建的速率.</dd>\
        <dt>已关闭</dt>\
        <dd>通道关闭的速率.</dd>\
      </dl> ',

    'queue-operations':
    ' <dl>\
        <dt>已定义</dt>\
        <dd>客户端声明队列的速率.</dd>\
        <dt>已创建</dt>\
        <dd>创建队列的速率. 声明已存在的队列将计入“已声明”事件,但不会计入“已创建”事件.</dd>\
        <dt>已删除</dt>\
        <dd>删除队列的速率.</dd>\
     </dl> '

};

///////////////////////////////////////////////////////////////////////////
//                                                                       //
// Mostly constant, typically get set once at startup (or rarely anyway) //
//                                                                       //
///////////////////////////////////////////////////////////////////////////

// All these are to do with hiding UI elements if
var rates_mode;                  // ...there are no fine stats
var user_administrator;          // ...user is not an admin
var is_user_policymaker;         // ...user is not a policymaker
var user_monitor;                // ...user cannot monitor
var nodes_interesting;           // ...we are not in a cluster
var vhosts_interesting;          // ...there is only one vhost
var rabbit_versions_interesting; // ...all cluster nodes run the same version

// Extensions write to this, the dispatcher maker reads it
var dispatcher_modules = [];

// We need to know when all extension script files have loaded
var extension_count;

// The dispatcher needs access to the Sammy app
var app;

// Used for the new exchange form, and to display broken exchange types
var exchange_types;

// Used for access control
var user_tags;
var user;

// Set up the above vars
function setup_global_vars() {
    var overview = JSON.parse(sync_get('/overview'));
    rates_mode = overview.rates_mode;
    user_tags = expand_user_tags(user.tags.split(","));
    user_administrator = jQuery.inArray("administrator", user_tags) != -1;
    is_user_policymaker = jQuery.inArray("policymaker", user_tags) != -1;
    user_monitor = jQuery.inArray("monitoring", user_tags) != -1;
    exchange_types = overview.exchange_types.map(function(xt) { return xt.name; });

    cluster_name = fmt_escape_html(overview.cluster_name);
    $('#logout').before(
      '<li>集群 ' + (user_administrator ?  '<a href="#/cluster-name">' + cluster_name + '</a>' : cluster_name) + '</li>'
    );

    user_name = fmt_escape_html(user.name);
    $('#header #logout').prepend(
      '用户 ' + (user_administrator ?  '<a href="#/users/' + user_name + '">' + user_name + '</a>' : user_name)
    );

    $('#versions').html(
      '<abbr title="Available exchange types: ' + exchange_types.join(", ") + '">' + fmt_escape_html(overview.rabbitmq_version) + '</abbr>' +
      '<abbr title="' + fmt_escape_html(overview.erlang_full_version) + '">Erlang ' + fmt_escape_html(overview.erlang_version) + '</abbr>'
    );
    nodes_interesting = false;
    rabbit_versions_interesting = false;
    if (user_monitor) {
        var nodes = JSON.parse(sync_get('/nodes'));
        if (nodes.length > 1) {
            nodes_interesting = true;
            var v = '';
            for (var i = 0; i < nodes.length; i++) {
                var v1 = fmt_rabbit_version(nodes[i].applications);
                if (v1 != 'unknown') {
                    if (v != '' && v != v1) rabbit_versions_interesting = true;
                    v = v1;
                }
            }
        }
    }
    vhosts_interesting = JSON.parse(sync_get('/vhosts')).length > 1;
    current_vhost = get_pref('vhost');
    exchange_types = overview.exchange_types;

    setup_chart_ranges(overview.sample_retention_policies);
}

function setup_chart_ranges(srp) {
    var range_types = ['global', 'basic'];
    var default_ranges = {
        60:    ['60|5', '近一分钟'],
        600:   ['600|5', '近十分钟'],
        3600:  ['3600|60', '近一小时'],
        28800: ['28800|600', '近八小时'],
        86400: ['86400|1800', '近一天']
    };

    for (var range in default_ranges) {
        var data = default_ranges[range];
        var range = data[0];
        var desc = data[1];
        ALL_CHART_RANGES[range] = desc;
    }

    for (var i = 0; i < range_types.length; ++i) {
        var range_type = range_types[i];
        if (srp.hasOwnProperty(range_type)) {
            var srp_range_types = srp[range_type];
            var last_minute_added = false;
            for (var j = 0; j < srp_range_types.length; ++j) {
                var srp_range = srp_range_types[j];
                if (default_ranges.hasOwnProperty(srp_range)) {
                    if (srp_range === 60) {
                        last_minute_added = true;
                    }
                    var v = default_ranges[srp_range];
                    CHART_RANGES[range_type].push(v);
                }
            }
            if (!last_minute_added) {
                var last_minute = default_ranges[60];
                CHART_RANGES[range_type].unshift(last_minute);
            }
        }
    }
}

function expand_user_tags(tags) {
    var new_tags = [];
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        new_tags.push(tag);
        switch (tag) { // Note deliberate fall-through
            case "administrator": new_tags.push("monitoring");
                                  new_tags.push("policymaker");
            case "monitoring":    new_tags.push("management");
                                  break;
            case "policymaker":   new_tags.push("management");
            default:              break;
        }
    }
    return new_tags;
}

////////////////////////////////////////////////////
//                                                //
// Change frequently (typically every "new page") //
//                                                //
////////////////////////////////////////////////////

// Which top level template we're showing
var current_template;

// Which JSON requests do we need to populate it
var current_reqs;

// And which of those have yet to return (so we can cancel them when
// changing current_template).
var outstanding_reqs = [];

// Which tab is highlighted
var current_highlight;

// Which vhost are we looking at
var current_vhost = '';

// What is our current sort order
var current_sort;
var current_sort_reverse = false;

var current_filter = '';
var current_filter_regex_on = false;

var current_filter_regex;
var current_truncate;

// The timer object for auto-updates, and how often it goes off
var timer;
var timer_interval;

// When did we last connect successfully (for the "could not connect" error)
var last_successful_connect;

// Every 200 updates without user interaction we do a full refresh, to
// work around memory leaks in browser DOM implementations.
// TODO: maybe we don't need this any more?
var update_counter = 0;

// Holds chart data in between writing the div in an ejs and rendering
// the chart.
var chart_data = {};

// whenever a UI requests a page that doesn't exist
// because things were deleted between refreshes
var last_page_out_of_range_error = 0;
