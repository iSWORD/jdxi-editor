/**
 * The Minilogue front panel program editing interface.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import * as programLib from '../minilogue/program';
import Knob from './Knob.jsx';
import Icon from './Icon.jsx';
import ActionMenu from './ActionMenu.jsx';
import ExtraParameters from './ExtraParameters.jsx';
import ParameterKnob from './ParameterKnob.jsx';
import ParameterSwitch from './ParameterSwitch.jsx';
import ProgramNameContainer from '../containers/ProgramNameContainer.jsx';
import LibraryIndexContainer from '../containers/LibraryIndexContainer.jsx';
import RandomProgramContainer from '../containers/RandomProgramContainer.jsx';
import RequestProgramContainer from '../containers/RequestProgramContainer.jsx';
import SendProgramContainer from '../containers/SendProgramContainer.jsx';
import VoiceModeContainer from '../containers/VoiceModeContainer.jsx';
import LEDArrayContainer from '../containers/LEDArrayContainer.jsx';
import ProgramChangeContainer from '../containers/ProgramChangeContainer.jsx';

import './Panel.css';
import randomIcon from '../assets/shuffle.svg';
import sendIcon from '../assets/send.svg';
import receiveIcon from '../assets/receive.svg';

import sawtoothIcon from '../assets/saw.svg';
import triangleIcon from '../assets/triangle.svg';
import squareIcon from '../assets/square.svg';

const WAVE_ICON_SIZE = 10;

const WAVE_ICONS = [sawtoothIcon, triangleIcon, squareIcon].map(
  icon => (
    <Icon
      key={icon.id}
      use={icon.id}
      viewBox={icon.viewBox}
      height={WAVE_ICON_SIZE}
      width={WAVE_ICON_SIZE}
    />
  ),
);

/**
 * The panel section layout component.
 */
export default class Panel extends React.Component {
  static propTypes = {
    parameters: PropTypes.object,
  }

  state = {
    showExtraParameters: false,
  }

  render() {
    const { parameters } = this.props;
    return (
      <div className="section-wrapper">
        <Helmet>
          <title>{parameters[programLib.PROGRAM_NAME]}</title>
        </Helmet>

        <ActionMenu>
          <RandomProgramContainer title="Randomize Program">
            <Icon
              use={randomIcon.id}
              viewBox={randomIcon.viewBox}
              title="Randomize Program"
            />
          </RandomProgramContainer>
          <SendProgramContainer title="Send Program to Minilogue">
            <Icon
              use={sendIcon.id}
              viewBox={sendIcon.viewBox}
              title="Send Program to Minilogue"
            />
          </SendProgramContainer>
          <RequestProgramContainer title="Request Program from Minilogue">
            <Icon
              use={receiveIcon.id}
              viewBox={receiveIcon.viewBox}
              title="Request Program from Minilogue"
            />
          </RequestProgramContainer>
        </ActionMenu>

        <div className="panel">
          <header>
            <h1 className="program-title">
              <ProgramNameContainer />
            </h1>
          </header>

          <div className="panel-controls">
            <div className="panel-section" id="global">
              <div className="control-group">
                <div className="control-wrapper"><Knob value={1023} /></div>
                <p className="control-label label">Master</p>
              </div>
              <ParameterKnob
                parameters={parameters}
                parameter={programLib.BPM}
                min={100}
                max={3000}
              />
              <div id="keyboard-octave-leds">
                <LEDArrayContainer parameter={programLib.KEYBOARD_OCTAVE} />
              </div>
              <ParameterSwitch
                parameters={parameters}
                parameter={programLib.KEYBOARD_OCTAVE}
                vertical={false}
              />
            </div>

            <div className="panel-section" id="vcos">
              <div id="vco1" className="panel-group">
                <h2 className="panel-group-label label">VCO 1</h2>
                <ParameterSwitch parameters={parameters} parameter={programLib.VCO1_OCTAVE} />
                <LEDArrayContainer parameter={programLib.VCO1_OCTAVE} reverse={true} />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.VCO1_WAVE}
                  showLabels={true}
                  labels={WAVE_ICONS}
                />
                <ParameterKnob parameters={parameters} parameter={programLib.VCO1_PITCH} />
                <ParameterKnob parameters={parameters} parameter={programLib.VCO1_SHAPE} />
              </div>

              <div id="vco2" className="panel-group">
                <h2 className="panel-group-label label">VCO 2</h2>
                <ParameterSwitch parameters={parameters} parameter={programLib.VCO2_OCTAVE} />
                <LEDArrayContainer parameter={programLib.VCO2_OCTAVE} reverse={true} />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.VCO2_WAVE}
                  showLabels={true}
                  labels={WAVE_ICONS}
                />
                <ParameterKnob parameters={parameters} parameter={programLib.VCO2_PITCH} />
                <ParameterKnob parameters={parameters} parameter={programLib.VCO2_SHAPE} />
              </div>

              <div id="vco2-mod" className="panel-group">
                <h2 className="panel-group-label label">VCO 2 Modulation</h2>
                <ParameterKnob
                  parameters={parameters}
                  parameter={programLib.CROSS_MOD_DEPTH}
                  id={'cross-mod-depth'}
                />
                <ParameterKnob parameters={parameters} parameter={programLib.VCO2_PITCH_EG_INT} />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.SYNC}
                  classNames={['control-group-half-width']}
                />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.RING}
                  classNames={['control-group-half-width']}
                />
              </div>
            </div>

            <div className="panel-section panel-group" id="mixer">
              <h2 className="panel-group-label label">Mixer</h2>
              <ParameterKnob parameters={parameters} parameter={programLib.VCO1_LEVEL} />
              <ParameterKnob parameters={parameters} parameter={programLib.VCO2_LEVEL} />
              <ParameterKnob parameters={parameters} parameter={programLib.NOISE_LEVEL} />
            </div>

            <div className="panel-section panel-group" id="filter">
              <h2 className="panel-group-label label">Filter</h2>
              <ParameterKnob parameters={parameters} parameter={programLib.CUTOFF} classNames={['cutoff']} />
              <ParameterKnob parameters={parameters} parameter={programLib.RESONANCE} />
              <ParameterKnob parameters={parameters} parameter={programLib.CUTOFF_EG_INT} />
              <p className="label control-label two-pole-label">2-Pole</p>
              <ParameterSwitch
                parameters={parameters}
                parameter={programLib.CUTOFF_TYPE}
                classNames={['control-group-two-thirds-width']}
              />
              <ParameterSwitch
                parameters={parameters}
                parameter={programLib.CUTOFF_KEYBOARD_TRACK}
                classNames={['control-group-two-thirds-width']}
              />
              <ParameterSwitch
                parameters={parameters}
                parameter={programLib.CUTOFF_VELOCITY}
                classNames={['control-group-two-thirds-width']}
              />
            </div>

            <div className="panel-section" id="eg-lfo">
              <div id="amp-eg" className="panel-group">
                <h2 className="panel-group-label label">Amp EG</h2>
                <ParameterKnob parameters={parameters} parameter={programLib.AMP_EG_ATTACK} />
                <ParameterKnob parameters={parameters} parameter={programLib.AMP_EG_DECAY} />
                <ParameterKnob parameters={parameters} parameter={programLib.AMP_EG_SUSTAIN} />
                <ParameterKnob parameters={parameters} parameter={programLib.AMP_EG_RELEASE} />
              </div>

              <div id="eg" className="panel-group">
                <h2 className="panel-group-label label">EG</h2>
                <ParameterKnob parameters={parameters} parameter={programLib.EG_ATTACK} />
                <ParameterKnob parameters={parameters} parameter={programLib.EG_DECAY} />
                <ParameterKnob parameters={parameters} parameter={programLib.EG_SUSTAIN} />
                <ParameterKnob parameters={parameters} parameter={programLib.EG_RELEASE} />
              </div>

              <div id="lfo" className="panel-group">
                <h2 className="panel-group-label label">LFO</h2>
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.LFO_WAVE}
                  classNames={['control-group-half-width']}
                  showLabels={true}
                  labels={WAVE_ICONS}
                />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.LFO_EG}
                  classNames={['control-group-half-width']}
                  showLabels={true}
                />
                <ParameterKnob parameters={parameters} parameter={programLib.LFO_RATE} />
                <ParameterKnob parameters={parameters} parameter={programLib.LFO_INT} />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.LFO_TARGET}
                  showLabels={true}
                />
              </div>
            </div>
            <div id="delay-interaction" className="panel-section">
              <div id="delay" className="panel-group">
                <h2 className="panel-group-label label">Delay</h2>
                <ParameterKnob
                  parameters={parameters}
                  parameter={programLib.DELAY_HI_PASS_CUTOFF}
                />
                <ParameterKnob parameters={parameters} parameter={programLib.DELAY_TIME} />
                <ParameterKnob parameters={parameters} parameter={programLib.DELAY_FEEDBACK} />
                <ParameterSwitch
                  parameters={parameters}
                  parameter={programLib.DELAY_OUTPUT_ROUTING}
                  showLabels={true}
                />
              </div>
              <div id="interaction" className="panel-group">
                <div id="screen">
                  <div id="display">
                    <LibraryIndexContainer />
                  </div>
                </div>
                <div className="control-group">
                  <div className="control-wrapper">
                    <ProgramChangeContainer />
                  </div>
                  <p className="control-label label">Program/Value</p>
                </div>
              </div>
            </div>
            <div className="panel-group" id="voice-mode-depth">
              <div className="control-group">
                <a
                  className="button shift-button"
                  onClick={() => this.setState(prevState => (
                    { showExtraParameters: !prevState.showExtraParameters }
                  ))}></a>
                <p className="control-label label">Shift</p>
              </div>
              <ParameterKnob parameters={parameters} parameter={programLib.VOICE_MODE_DEPTH} />
            </div>

            <div className="panel-group" id="app-controls">
              <h2 className="panel-group-label-small panel-group-label label">
                <span className="">Edit</span>
              </h2>
              <ul className="button-group button-group-small">
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Edit Mode</p>
                </li>
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Write</p>
                </li>
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Exit</p>
                </li>
              </ul>
            </div>


            <div className="panel-group" id="sequence-controls">
              <h2 className="panel-group-label-small panel-group-label label">
                <span className="">Sequencer</span>
              </h2>
              <ul className="button-group button-group-small">
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Step</p>
                </li>
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Play</p>
                </li>
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Rec</p>
                </li>
                <li>
                  <a className="button"></a>
                  <p className="control-label label">Rest</p>
                </li>
              </ul>
            </div>

            <div className="panel-group" id="voice-mode">
              <VoiceModeContainer parameter={programLib.VOICE_MODE} />
            </div>

          </div>
          {this.state.showExtraParameters && (
            <ExtraParameters parameters={parameters} />
          )}
        </div>

      </div>
    );
  }
}