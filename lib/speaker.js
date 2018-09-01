'use strict';

export default class Speaker {
  constructor(options = {}) {
    this._speechSynthesisUtterance = ('SpeechSynthesisUtterance' in window) ? new SpeechSynthesisUtterance() : null;
    this._isSay = (this._speechSynthesisUtterance) ? true : false;
    this.configure(options);
  }

  configure(options = {}) {
    if (!this._isSay) return null;

    this._speechSynthesisUtterance.voice  = (options.voice) ? options.voice : this.getVoices('en-US')[0];
    this._speechSynthesisUtterance.volume = (options.volume) ? options.volume : 1.0;
    this._speechSynthesisUtterance.rate   = (options.rate) ? options.rate : 1.0;
    this._speechSynthesisUtterance.pitch  = (options.pitch) ? options.pitch : 1.0;
    this._speechSynthesisUtterance.lang   = (options.lang) ? options.lang : 'en-US';
  }

  isSay() {
    return this._isSay;
  }

  speed(rate) {
    this._speechSynthesisUtterance.rate = rate;
  }

  say(text) {
    this._speechSynthesisUtterance.text = text;
    speechSynthesis.speak(this._speechSynthesisUtterance);
  }

  getVoices(lang) {
    return window.speechSynthesis.getVoices().filter(v => v.lang == lang);
  }

}