/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for crypto-asset-management-system', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be crypto-asset-management-system', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('crypto-asset-management-system');
    })
  });

  it('network-name should be crypto-asset-management-system@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('crypto-asset-management-system@0.0.1.bna');
    });
  });

  it('navbar-brand should be crypto-asset-management-system',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('crypto-asset-management-system');
    });
  });

  
    it('activo component should be loadable',() => {
      page.navigateTo('/activo');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('activo');
      });
    });

    it('activo table should have 15 columns',() => {
      page.navigateTo('/activo');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(15); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('usuario component should be loadable',() => {
      page.navigateTo('/usuario');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('usuario');
      });
    });

    it('usuario table should have 7 columns',() => {
      page.navigateTo('/usuario');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('banco component should be loadable',() => {
      page.navigateTo('/banco');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('banco');
      });
    });

    it('banco table should have 4 columns',() => {
      page.navigateTo('/banco');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('aseguradora component should be loadable',() => {
      page.navigateTo('/aseguradora');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('aseguradora');
      });
    });

    it('aseguradora table should have 4 columns',() => {
      page.navigateTo('/aseguradora');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('reaseguradora component should be loadable',() => {
      page.navigateTo('/reaseguradora');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('reaseguradora');
      });
    });

    it('reaseguradora table should have 4 columns',() => {
      page.navigateTo('/reaseguradora');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ConfirmacionBanco component should be loadable',() => {
      page.navigateTo('/ConfirmacionBanco');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ConfirmacionBanco');
      });
    });
  
    it('AsegurarActivo component should be loadable',() => {
      page.navigateTo('/AsegurarActivo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AsegurarActivo');
      });
    });
  
    it('ReasegurarActivo component should be loadable',() => {
      page.navigateTo('/ReasegurarActivo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ReasegurarActivo');
      });
    });
  
    it('Materializar component should be loadable',() => {
      page.navigateTo('/Materializar');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Materializar');
      });
    });

    it('Traspaso component should be loadable',() => {
      page.navigateTo('/Traspaso');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Traspaso');
      });
    });
  

});