import React, {Component} from 'react';
import './RichControls.css';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  //{label: 'H4', style: 'header-four'},
  //{label: 'H5', style: 'header-five'},
  //{label: 'H6', style: 'header-six'},


  {label: 'UL', style: 'unordered-list-item', icon: '\u002a'},
  {label: 'OL', style: 'ordered-list-item', icon: '\u0030'},
  {label: 'Blockquote', style: 'blockquote', icon: '\u005c'},
  {label: 'Code Block', style: 'code-block', icon: '\u0021'},
];

var INLINE_STYLES = [
  {label: 'B', style: 'BOLD', icon: "\u0022"},
  {label: 'I', style: 'ITALIC', icon: '\u0023'},
  {label: 'U', style: 'UNDERLINE', icon: '\u002f'},
  //{label: 'M', style: 'CODE', icon: ''},
];

class RichControls extends Component
{
  render() {

    var blockType;
    var currentStyle;

    if(this.props.editorState) {
      const editorState = this.props.editorState;
      const selection = editorState.getSelection();

      blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

      currentStyle = editorState.getCurrentInlineStyle();
    }

    return (
      <div>
        <div className="RichEditor-controls">

          {BLOCK_TYPES.map((type) =>
            <StyleButton
              key={type.label}
              type="block"
              active={type.style === blockType}
              label={type.label}
              icon={type.icon}
              onToggle={this.props.onToggle}
              style={type.style}
            />
          )}

          {INLINE_STYLES.map((type) =>
            <StyleButton
              key={type.label}
              type="inline"
              active={currentStyle && currentStyle.has(type.style)}
              label={type.label}
              icon={type.icon}
              onToggle={this.props.onToggle}
              style={type.style}
            />
          )}

        </div>
      </div>
    );
  }
};

class StyleButton extends Component
{
  constructor()
  {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.type, this.props.style);
    };
  }

  render() {

    let className = '';
    if(this.props.icon)
    {
      className += 'RichEditor-icon';
    }
    else
    {
      className += 'RichEditor-styleButton';
    }

    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    if(this.props.icon)
    {
      return <i className={className} onMouseDown={this.onToggle}>{this.props.icon}</i>
    }
    else
    {
      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }

  }
}

export default RichControls;