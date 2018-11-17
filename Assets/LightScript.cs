using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightScript : MonoBehaviour {

	Vector3 myVector;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		myVector = new Vector3 (1.0f, 1.0f, 1.0f);
		while (true) {
			transform.Rotate (myVector * Time.deltaTime);
		}
	}
}
