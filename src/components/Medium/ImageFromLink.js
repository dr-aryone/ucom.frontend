import MediumEditor from 'medium-editor';
import { getBlockFromElement } from './utils';

const IMG_URL_REGEXP = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

export default class ImageFromLink extends MediumEditor.Extension {
  name = 'ImageFromLink';

  init() {
    this.base.subscribe('editableKeyup', () => {
      this.getEditorElements().forEach((el) => {
        Array.from(el.querySelectorAll('a'))
          .filter(el => IMG_URL_REGEXP.test(el.href))
          .forEach(el => this.converLinkToImage(el));
      });
    });
  }

  converLinkToImage(linkEl) {
    const block = getBlockFromElement(linkEl);
    const p = document.createElement('p');
    p.contentEditable = false;
    const img = document.createElement('img');
    img.src = linkEl.href;
    p.appendChild(img);

    linkEl.parentNode.removeChild(linkEl);

    if (!block.textContent.length) {
      block.parentNode.replaceChild(p, block);
    } else {
      block.parentNode.insertBefore(p, block.nextSibling);
    }

    if (p.parentNode.lastChild === p) {
      const newP = document.createElement('p');
      newP.innerHTML = '<br>';
      p.parentElement.appendChild(newP);
      setTimeout(() => {
        this.base.selectElement(newP);
        const selection = this.base.exportSelection();
        selection.start = selection.end;
        this.base.importSelection(selection);
        this.base.checkContentChanged(this.base.origElements);
      }, 0);
    }

    this.base.checkContentChanged(this.base.origElements);
  }
}
