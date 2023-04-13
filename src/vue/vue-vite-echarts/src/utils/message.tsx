import { createApp } from 'vue';
import { styled } from '@styils/vue';

interface Options {
  confirm: (action: () => void) => void;
}

const DivModal = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  left: 0,
  top: 0,
  zIndex: 99,
  backgroundColor: '#00000050',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const DivBox = styled('div', {
  backgroundColor: '#ffffff',
  color: '#333',
  borderRadius: '10px',
  boxShadow: '0 0 3px #00000050',
  display: 'flex',
  minWidth: '30%',
  flexDirection: 'column',
  alignItems: 'center',
});

const DivText = styled('div', {
  marginBottom: '1em',
});

const MessageBox = {
  props: {
    msg: {
      type: String,
      require: true,
    },
  },
  render(ctx: { $props: any; $emit: any }) {
    const { $props, $emit } = ctx;
    return (
      <DivModal>
        <DivBox class="box">
          <DivText class="text">{$props.msg}</DivText>
          <button onClick={$emit('onClick')}>确定</button>
        </DivBox>
      </DivModal>
    );
  },
};
/**
 * 消息弹框
 * @param msg
 * @param options
 * @example
 *  showMsg('这是各一个消息弹框', {
 *    confirm(close) {
 *      close();
 *    }
 *  })
 */
export function showMsg(msg: string, options: Options) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const msgApp = createApp(MessageBox, {
    msg,
    onClick: () => {
      // 关闭消息弹框
      const close = () => {
        msgApp.unmount();
        div.remove();
      };
      // 给配置的消息弹框传入关闭方法
      options?.confirm?.(close);
    },
  });
  msgApp.mount(div);
}
